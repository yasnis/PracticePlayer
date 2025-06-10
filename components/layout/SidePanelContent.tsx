"use client";

import React, { useState, useCallback, useEffect } from 'react';
import Logo from './Logo';
import PlaylistContainer from '../playlist/PlaylistContainer';
import UsageGuideButton from '../ui/UsageGuideButton';
import styles from '../../styles/SidePanelContent.module.css';

// モーダルの表示状態を管理するためのグローバルイベント
const GUIDE_MODAL_EVENT = 'openUsageGuide';

/**
 * サイドパネルのコンテンツをラップするクライアントコンポーネント
 * イベントハンドラーなどのクライアントサイド機能を利用するために必要
 */
const SidePanelContent: React.FC = () => {
  // 選択中のプレイリストID
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  // クライアントサイドでのレンダリングを確認するためのstate
  const [isClient, setIsClient] = useState(false);

  // クライアントサイドでのレンダリングを確認
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 初回アクセス時に使い方ガイドを自動表示
  useEffect(() => {
    if (isClient) {
      const guideShown = localStorage.getItem('guide_shown');
      if (guideShown !== 'true') {
        // カスタムイベントを発行して、ルートレベルで表示を制御
        window.dispatchEvent(new CustomEvent(GUIDE_MODAL_EVENT));
      }
    }
  }, [isClient]);

  // プレイリスト選択時の処理
  const handleSelectPlaylist = useCallback((playlistId: string) => {
    console.log('Selected playlist:', playlistId);
    setSelectedPlaylistId(playlistId);
  }, []);

  // 使い方ガイドを開く
  const handleOpenGuide = useCallback(() => {
    // カスタムイベントを発行して、ルートレベルで表示を制御
    window.dispatchEvent(new CustomEvent(GUIDE_MODAL_EVENT));
  }, []);

  return (
    <div className={styles.sidePanelContent}>
      <Logo />
      <div className={styles.playlistsSection}>
        <PlaylistContainer onSelectPlaylist={handleSelectPlaylist} />
      </div>
      <div className={styles.bottomSection}>
        <UsageGuideButton onOpenGuide={handleOpenGuide} />
      </div>
    </div>
  );
};

export default SidePanelContent;