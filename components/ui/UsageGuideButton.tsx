"use client";

import React, { useCallback } from 'react';
import styles from '../../styles/UsageGuideButton.module.css';

interface UsageGuideButtonProps {
  onOpenGuide: () => void;
}

/**
 * 使い方ガイドを開くためのボタンコンポーネント
 * 左サイドパネルの下部に配置される
 */
const UsageGuideButton: React.FC<UsageGuideButtonProps> = ({ onOpenGuide }) => {
  const handleClick = useCallback(() => {
    onOpenGuide();
  }, [onOpenGuide]);

  return (
    <button
      className={styles.guideButton}
      onClick={handleClick}
      aria-label="使い方ガイドを開く"
    >
      <span className={styles.infoIcon}>?</span>
      <span className={styles.buttonText}>使い方ガイド</span>
    </button>
  );
};

export default UsageGuideButton;