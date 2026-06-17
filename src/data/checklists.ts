import { ChecklistCategory } from '../types';

export const checklistData: ChecklistCategory[] = [
  {
    id: 'cl001',
    title: '基本準備',
    icon: 'clipboard-check-outline',
    items: [
      { id: 'cl001-1', text: '当日の担当範囲を院内方針で確認', checked: false },
      { id: 'cl001-2', text: '患者さんへの声かけ内容を確認', checked: false },
      { id: 'cl001-3', text: '使用器具と準備物を確認', checked: false },
      { id: 'cl001-4', text: '不明点を歯科医師または先輩へ確認', checked: false },
    ],
  },
  {
    id: 'cl002',
    title: '安全確認',
    icon: 'shield-check-outline',
    items: [
      { id: 'cl002-1', text: '判断が必要な項目を自分だけで決めない', checked: false },
      { id: 'cl002-2', text: '診断・治療・薬剤・麻酔・X線読影に関わる内容は歯科医師へ確認', checked: false },
      { id: 'cl002-3', text: '気になる観察事項を客観的に記録', checked: false },
      { id: 'cl002-4', text: '院内の報告ルートを確認', checked: false },
    ],
  },
  {
    id: 'cl003',
    title: '感染対策',
    icon: 'shield-check-outline',
    items: [
      { id: 'cl003-1', text: '手指衛生を実施', checked: false },
      { id: 'cl003-2', text: 'PPEを院内ルールに沿って装着', checked: false },
      { id: 'cl003-3', text: '器具の洗浄・滅菌状態を確認', checked: false },
      { id: 'cl003-4', text: '使用後器具の取り扱い手順を確認', checked: false },
    ],
  },
  {
    id: 'cl004',
    title: '説明前確認',
    icon: 'message-text-outline',
    items: [
      { id: 'cl004-1', text: '説明目的を一文で整理', checked: false },
      { id: 'cl004-2', text: '断定表現を避ける', checked: false },
      { id: 'cl004-3', text: '判断が必要な内容は歯科医師へつなぐ', checked: false },
      { id: 'cl004-4', text: '患者さんの不明点を確認', checked: false },
    ],
  },
];
