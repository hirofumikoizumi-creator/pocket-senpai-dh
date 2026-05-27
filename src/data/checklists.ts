import { ChecklistCategory } from '../types';

/**
 * チェックリストデータ
 */
export const checklistData: ChecklistCategory[] = [
  {
    id: 'cl001',
    title: 'スケーリング準備',
    icon: 'clipboard-check-outline',
    items: [
      { id: 'cl001-1', text: '患者カルテの確認（全身疾患・服薬）', checked: false },
      { id: 'cl001-2', text: '前回の処置内容確認', checked: false },
      { id: 'cl001-3', text: '超音波スケーラーのチップ確認', checked: false },
      { id: 'cl001-4', text: '手用スケーラーのシャープニング確認', checked: false },
      { id: 'cl001-5', text: 'ミラー・エキスプローラー準備', checked: false },
      { id: 'cl001-6', text: 'ガーゼ・コットンロール準備', checked: false },
      { id: 'cl001-7', text: '吸引チップの装着確認', checked: false },
      { id: 'cl001-8', text: 'グローブ・マスク・ゴーグル装着', checked: false },
    ],
  },
  {
    id: 'cl002',
    title: 'SRP確認',
    icon: 'tooth-outline',
    items: [
      { id: 'cl002-1', text: 'プロービングチャート確認', checked: false },
      { id: 'cl002-2', text: 'X線写真確認', checked: false },
      { id: 'cl002-3', text: '麻酔の必要性確認（Dr.に確認）', checked: false },
      { id: 'cl002-4', text: '適切なキュレット選択', checked: false },
      { id: 'cl002-5', text: '術前の患者説明', checked: false },
      { id: 'cl002-6', text: '出血への対応準備', checked: false },
      { id: 'cl002-7', text: '術後注意事項の説明準備', checked: false },
      { id: 'cl002-8', text: '次回予約の確認', checked: false },
    ],
  },
  {
    id: 'cl003',
    title: '感染対策',
    icon: 'shield-check-outline',
    items: [
      { id: 'cl003-1', text: '手指消毒の実施', checked: false },
      { id: 'cl003-2', text: 'PPE（個人防護具）の装着', checked: false },
      { id: 'cl003-3', text: '器具の滅菌確認', checked: false },
      { id: 'cl003-4', text: 'ユニットの消毒', checked: false },
      { id: 'cl003-5', text: 'バリアテープの貼付', checked: false },
      { id: 'cl003-6', text: '使用後器具の適切な廃棄・洗浄', checked: false },
      { id: 'cl003-7', text: '鋭利物の安全な取り扱い', checked: false },
      { id: 'cl003-8', text: '環境表面の清拭', checked: false },
    ],
  },
  {
    id: 'cl004',
    title: '小児対応',
    icon: 'emoticon-happy-outline',
    items: [
      { id: 'cl004-1', text: '年齢に応じた対応方法の確認', checked: false },
      { id: 'cl004-2', text: '保護者への事前説明', checked: false },
      { id: 'cl004-3', text: 'Tell-Show-Do法の準備', checked: false },
      { id: 'cl004-4', text: 'ご褒美の準備', checked: false },
      { id: 'cl004-5', text: '短時間処置の計画', checked: false },
      { id: 'cl004-6', text: '緊急時の対応確認', checked: false },
      { id: 'cl004-7', text: '保護者への結果説明', checked: false },
      { id: 'cl004-8', text: '次回の計画共有', checked: false },
    ],
  },
  {
    id: 'cl005',
    title: '器具片付け',
    icon: 'broom',
    items: [
      { id: 'cl005-1', text: '使用済み器具の回収', checked: false },
      { id: 'cl005-2', text: '鋭利物の安全な廃棄', checked: false },
      { id: 'cl005-3', text: '器具の洗浄（超音波洗浄機）', checked: false },
      { id: 'cl005-4', text: '器具の乾燥', checked: false },
      { id: 'cl005-5', text: '滅菌パックへの封入', checked: false },
      { id: 'cl005-6', text: 'オートクレーブでの滅菌', checked: false },
      { id: 'cl005-7', text: '滅菌物の保管', checked: false },
      { id: 'cl005-8', text: 'ユニットの清掃・消毒', checked: false },
    ],
  },
  {
    id: 'cl006',
    title: 'メンテナンス確認',
    icon: 'calendar-check-outline',
    items: [
      { id: 'cl006-1', text: '前回からの変化確認（問診）', checked: false },
      { id: 'cl006-2', text: 'プロービング検査', checked: false },
      { id: 'cl006-3', text: 'BOP確認', checked: false },
      { id: 'cl006-4', text: 'プラークスコア記録', checked: false },
      { id: 'cl006-5', text: '口腔内写真撮影（必要時）', checked: false },
      { id: 'cl006-6', text: 'セルフケア状況の確認', checked: false },
      { id: 'cl006-7', text: '専門的ケアの実施', checked: false },
      { id: 'cl006-8', text: '次回間隔の決定・予約', checked: false },
    ],
  },
];
