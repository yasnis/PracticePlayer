"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from '../../styles/SidePanel.module.css';

interface SidePanelProps {
  children: React.ReactNode;
}

/**
 * 左サイドバーのベースコンポーネント
 * - PC(>1024px)では常時表示
 * - モバイル/タブレット(<=1024px)ではハンバーガーメニューで開閉
 */
const SidePanel: React.FC<SidePanelProps> = ({ children }) => {
  // ブラウザのwindowオブジェクトを使用してメディアクエリを判定
  const [isMobile, setIsMobile] = useState(false);
  
  // サイドパネルの開閉状態
  const [isOpen, setIsOpen] = useState(false);
  
  // レスポンシブ状態の判定
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    
    // 初期チェック
    checkIfMobile();
    
    // リサイズイベントでチェック
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // 初期状態設定（PCなら常時表示、モバイルならlocalStorageから復元）
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(true);
    } else {
      const savedState = localStorage.getItem('sidepanel_open');
      setIsOpen(savedState === 'true');
    }
  }, [isMobile]);
  
  // 状態変更時にlocalStorageに保存（モバイル時のみ）
  useEffect(() => {
    if (isMobile) {
      localStorage.setItem('sidepanel_open', String(isOpen));
    }
  }, [isOpen, isMobile]);
  
  // サイドパネルを閉じる処理
  const closeSidePanel = useCallback(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);
  
  // サイドパネルの開閉を切り替え
  const toggleSidePanel = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);
  
  // Escキーでパネルを閉じる処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobile && isOpen) {
        closeSidePanel();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, isOpen, closeSidePanel]);

  return (
    <>
      {/* モバイル用メニューボタン - 開閉状態で表示切替 */}
      {isMobile && (
        <button 
          className={styles.menuButton}
          onClick={toggleSidePanel}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {isOpen ? (
            <div className={styles.closeIcon}>
              <span></span>
              <span></span>
            </div>
          ) : (
            <Image
              src="/practiceplayer/assets/logo_square_black.svg"
              alt="Practice Player Menu"
              width={24}
              height={24}
              className={styles.logoIcon}
            />
          )}
        </button>
      )}
      
      {/* サイドパネル本体 */}
      <aside 
        className={`${styles.sidePanel} ${isOpen ? styles.open : styles.closed} ${isMobile ? styles.mobile : ''}`}
      >
        <div className={styles.sidePanelContent}>
          {children}
        </div>
      </aside>
      
      {/* モバイル時のオーバーレイ背景（クリックで閉じる） */}
      {isMobile && isOpen && (
        <div 
          className={styles.overlay} 
          onClick={closeSidePanel}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default SidePanel;