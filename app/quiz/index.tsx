import React, { useState } from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../src/utils/theme';
import { FREE_PLAN_LIMITS } from '../../src/constants/plans';
import { quizData, getQuizCategories, getQuizzesByCategory } from '../../src/data/quizzes';
import { Quiz } from '../../src/types';
import { Disclaimer } from '../../src/components/Disclaimer';
import { FavoriteButton } from '../../src/components/FavoriteButton';
import { PremiumPrompt } from '../../src/components/PremiumPrompt';
import { useDailyLimit } from '../../src/hooks/useDailyLimit';
import { useSubscription } from '../../src/hooks/useSubscription';

type QuizState = 'category' | 'playing' | 'result';

export default function QuizScreen() {
  const router = useRouter();
  const { isPremium } = useSubscription();
  const quizLimit = useDailyLimit('@pocket_senpai_daily_quiz', FREE_PLAN_LIMITS.dailyQuizQuestions, isPremium);
  const [state, setState] = useState<QuizState>('category');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentQuizzes, setCurrentQuizzes] = useState<Quiz[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const categories = getQuizCategories();

  const showLimitAlert = () => {
    Alert.alert(
      '本日の無料クイズ上限です',
      `無料プランではミニ学習クイズは1日${FREE_PLAN_LIMITS.dailyQuizQuestions}問までです。プレミアムでは全問利用できます。`,
      [
        { text: 'あとで', style: 'cancel' },
        { text: 'プレミアムを見る', onPress: () => router.push('/premium' as any) },
      ]
    );
  };

  const startQuiz = (category: string) => {
    if (!quizLimit.canUse) {
      showLimitAlert();
      return;
    }

    const quizzes = getQuizzesByCategory(category);
    const availableQuizzes = isPremium ? quizzes : quizzes.slice(0, Math.min(quizzes.length, quizLimit.remaining));

    setSelectedCategory(category);
    setCurrentQuizzes(availableQuizzes);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setState('playing');
  };

  const handleAnswer = async (index: number) => {
    if (selectedAnswer !== null) return;
    if (!quizLimit.canUse) {
      showLimitAlert();
      return;
    }

    await quizLimit.increment();
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === currentQuizzes[currentIndex].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= currentQuizzes.length) {
      setState('result');
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setState('category');
    setSelectedCategory('');
    setCurrentQuizzes([]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const categoryColors: Record<string, string> = {
    '歯周病基礎': '#4ECDC4',
    'TBI': '#FF6B9D',
    'SRP': '#45B7D1',
    'プラークコントロール': '#96CEB4',
    '器具知識': '#FECA57',
    '患者対応': '#DDA0DD',
  };

  if (state === 'category') {
    return (
      <>
        <Stack.Screen options={{ title: 'ミニ学習クイズ', headerBackTitle: '戻る' }} />
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Disclaimer />
          <Text style={styles.headerText}>
            {isPremium
              ? `全${quizData.length}問からカテゴリを選んで挑戦できます`
              : `無料プランでは1日${FREE_PLAN_LIMITS.dailyQuizQuestions}問まで挑戦できます。本日あと${quizLimit.remaining}問`}
          </Text>
          {!isPremium && !quizLimit.canUse && (
            <PremiumPrompt title="本日の無料クイズは終了しました" message="プレミアムではミニ学習クイズを全問利用できます。" />
          )}
          {categories.map((category) => {
            const count = getQuizzesByCategory(category).length;
            const color = categoryColors[category] || COLORS.primary;
            return (
              <TouchableOpacity
                key={category}
                style={styles.categoryCard}
                onPress={() => startQuiz(category)}
                activeOpacity={0.7}
              >
                <View style={[styles.categoryIcon, { backgroundColor: color + '20' }]}>
                  <MaterialCommunityIcons name="lightbulb-outline" size={24} color={color} />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryTitle}>{category}</Text>
                  <Text style={styles.categoryCount}>{count}問</Text>
                </View>
                <MaterialCommunityIcons name="play-circle-outline" size={24} color={color} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </>
    );
  }

  if (state === 'playing') {
    const quiz = currentQuizzes[currentIndex];
    return (
      <>
        <Stack.Screen options={{ title: selectedCategory, headerBackTitle: '戻る' }} />
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Disclaimer />
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>
              {currentIndex + 1} / {currentQuizzes.length}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${((currentIndex + 1) / currentQuizzes.length) * 100}%` },
                ]}
              />
            </View>
          </View>

          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{quiz.question}</Text>
            <View style={styles.favoriteRow}>
              <FavoriteButton
                item={{
                  id: quiz.id,
                  type: 'quiz',
                  title: quiz.question,
                  category: quiz.category,
                  summary: quiz.explanation,
                  details: [
                    { label: '問題', text: quiz.question },
                    { label: '選択肢', text: quiz.options.map((option, optionIndex) => `${String.fromCharCode(65 + optionIndex)}. ${option}`).join('\n') },
                    { label: '正解', text: quiz.options[quiz.correctIndex] },
                    { label: '解説', text: quiz.explanation },
                  ],
                }}
              />
            </View>
          </View>

          {quiz.options.map((option, index) => {
            let optionStyle = styles.optionDefault;
            let textStyle = styles.optionTextDefault;

            if (selectedAnswer !== null) {
              if (index === quiz.correctIndex) {
                optionStyle = styles.optionCorrect;
                textStyle = styles.optionTextCorrect;
              } else if (index === selectedAnswer && index !== quiz.correctIndex) {
                optionStyle = styles.optionWrong;
                textStyle = styles.optionTextWrong;
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={[styles.optionButton, optionStyle]}
                onPress={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                activeOpacity={0.7}
              >
                <View style={styles.optionLabel}>
                  <Text style={[styles.optionLabelText, textStyle]}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={[styles.optionText, textStyle]}>{option}</Text>
                {selectedAnswer !== null && index === quiz.correctIndex && (
                  <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.success} />
                )}
                {selectedAnswer !== null && index === selectedAnswer && index !== quiz.correctIndex && (
                  <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.error} />
                )}
              </TouchableOpacity>
            );
          })}

          {showExplanation && (
            <View style={styles.explanationCard}>
              <View style={styles.explanationHeader}>
                <MaterialCommunityIcons name="lightbulb-on-outline" size={18} color={COLORS.primary} />
                <Text style={styles.explanationTitle}>解説</Text>
              </View>
              <Text style={styles.explanationText}>{quiz.explanation}</Text>
            </View>
          )}

          {selectedAnswer !== null && (
            <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
              <Text style={styles.nextButtonText}>
                {currentIndex + 1 >= currentQuizzes.length ? '結果を見る' : '次の問題'}
              </Text>
              <MaterialCommunityIcons name="arrow-right" size={18} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: '結果', headerBackTitle: '戻る' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.resultContent}>
        <Disclaimer />
        <View style={styles.resultCard}>
          <MaterialCommunityIcons
            name={score >= currentQuizzes.length * 0.7 ? 'trophy' : 'emoticon-outline'}
            size={60}
            color={score >= currentQuizzes.length * 0.7 ? '#FECA57' : COLORS.primary}
          />
          <Text style={styles.resultTitle}>
            {score >= currentQuizzes.length * 0.7 ? 'すごい！' : 'お疲れさま！'}
          </Text>
          <Text style={styles.resultScore}>
            {score} / {currentQuizzes.length} 正解
          </Text>
          <Text style={styles.resultMessage}>
            {score >= currentQuizzes.length * 0.7
              ? 'よく勉強できていますね！この調子で頑張りましょう。'
              : '間違えた問題を復習して、もう一度チャレンジしてみましょう！'}
          </Text>
        </View>

        {!isPremium && (
          <View style={styles.rewardAdSpace}>
            <MaterialCommunityIcons name="play-circle-outline" size={24} color={COLORS.primary} />
            <Text style={styles.rewardAdText}>動画を見て追加解説を見る</Text>
            <Text style={styles.rewardAdSubtext}>（広告スペース）</Text>
          </View>
        )}

        <TouchableOpacity style={styles.retryButton} onPress={() => startQuiz(selectedCategory)}>
          <MaterialCommunityIcons name="refresh" size={18} color={COLORS.primary} />
          <Text style={styles.retryButtonText}>もう一度挑戦</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={resetQuiz}>
          <Text style={styles.backButtonText}>カテゴリ選択に戻る</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  headerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  categoryCount: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  progressContainer: {
    marginBottom: SPACING.lg,
  },
  progressLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'right',
    marginBottom: SPACING.xs,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  questionCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  questionText: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 28,
  },
  favoriteRow: {
    marginTop: SPACING.md,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  optionDefault: {},
  optionCorrect: {
    borderColor: COLORS.success,
    backgroundColor: '#F0FFF4',
  },
  optionWrong: {
    borderColor: COLORS.error,
    backgroundColor: '#FFF5F5',
  },
  optionLabel: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  optionLabelText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
  },
  optionText: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  optionTextDefault: {},
  optionTextCorrect: {
    color: COLORS.success,
    fontWeight: '600',
  },
  optionTextWrong: {
    color: COLORS.error,
  },
  explanationCard: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.md,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  explanationTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },
  explanationText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    lineHeight: 22,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.xl,
    paddingVertical: SPACING.md,
    marginTop: SPACING.lg,
  },
  nextButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.white,
    marginRight: SPACING.sm,
  },
  resultContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
    alignItems: 'center',
  },
  resultCard: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    width: '100%',
    ...SHADOWS.md,
  },
  resultTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  resultScore: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },
  resultMessage: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.md,
    lineHeight: 22,
  },
  rewardAdSpace: {
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  rewardAdText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },
  rewardAdSubtext: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.lg,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    width: '100%',
  },
  retryButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: SPACING.sm,
  },
  backButton: {
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  backButtonText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
});
