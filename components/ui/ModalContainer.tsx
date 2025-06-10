"use client";

import React, { useState, useEffect } from 'react';
import UsageGuideModal from './UsageGuideModal';

// モーダルの表示状態を管理するためのグローバルイベント名
const GUIDE_MODAL_EVENT = 'openUsageGuide';

/**
 * モーダルを画面全体に表示するためのクライアントコンポーネント
 */
const ModalContainer: React.FC = () => {
  // 使い方ガイドモーダルの表示状態
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    // ガイドモーダルを開くカスタムイベントのリスナー
    const handleOpenGuide = () => {
      setShowGuide(true);
    };

    // イベントリスナーを登録
    window.addEventListener(GUIDE_MODAL_EVENT, handleOpenGuide);

    // コンポーネント解除時にリスナーも解除
    return () => {
      window.removeEventListener(GUIDE_MODAL_EVENT, handleOpenGuide);
    };
  }, []);

  // モーダルを閉じる処理
  const handleCloseGuide = () => {
    setShowGuide(false);
  };

  return (
    <UsageGuideModal isOpen={showGuide} onClose={handleCloseGuide} />
  );
};

export default ModalContainer;