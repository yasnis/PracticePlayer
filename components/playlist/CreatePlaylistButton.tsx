"use client";

import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from '../../styles/CreatePlaylistButton.module.css';

interface CreatePlaylistButtonProps {
  onPlaylistCreated: (playlistId: string) => void;
}

/**
 * 新規プレイリスト作成ボタンコンポーネント
 * プレイリスト一覧の最下部に配置され、クリックで新しいプレイリストを作成する
 */
const CreatePlaylistButton: React.FC<CreatePlaylistButtonProps> = ({ onPlaylistCreated }) => {
  // 新規プレイリスト作成処理 - useCallbackでメモ化して不要な再レンダリングを防止
  const handleCreatePlaylist = useCallback(() => {
    try {
      // 現在のプレイリスト一覧を取得
      const savedPlaylists = localStorage.getItem('playlists');
      const playlists = savedPlaylists ? JSON.parse(savedPlaylists) : [];
      
      // 新規プレイリストのID生成
      const newPlaylistId = uuidv4();
      
      // 日時を含むプレイリスト名を生成
      const now = new Date();
      const dateStr = now.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/\//g, '-');
      
      // 新規プレイリストのデータを作成
      const newPlaylist = {
        id: newPlaylistId,
        name: `Playlist ${dateStr}`,
        tracks: [],
        createdAt: now.getTime()
      };
      
      // プレイリスト一覧に追加
      const updatedPlaylists = [...playlists, newPlaylist];
      
      // localStorageに保存
      localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
      
      // 作成したプレイリストを選択状態にする
      localStorage.setItem('selectedPlaylistId', newPlaylistId);
      
      // プレイリスト作成完了を通知
      onPlaylistCreated(newPlaylistId);
      
      console.log('プレイリストを作成しました:', newPlaylist);
    } catch (error) {
      console.error('プレイリスト作成に失敗しました:', error);
    }
  }, [onPlaylistCreated]);

  return (
    <button 
      className={styles.createButton}
      onClick={handleCreatePlaylist}
      aria-label="Create Playlist"
    >
      <span className={styles.plusIcon}>+</span>
      <span className={styles.buttonText}>Create Playlist</span>
    </button>
  );
};

export default CreatePlaylistButton;