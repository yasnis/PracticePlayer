"use client";

import React, { useState, useEffect, useCallback } from 'react';
import CreatePlaylistButton from './CreatePlaylistButton';
import styles from '../../styles/PlaylistContainer.module.css';

// 仕様書に基づくデータ型定義
interface PlaylistSummary {
  id: string;
  name: string;
  createdAt: number;
}

interface PlaylistContainerProps {
  onSelectPlaylist: (playlistId: string) => void;
}

/**
 * プレイリスト一覧を表示するコンポーネント
 * 左パネル中部に配置され、プレイリストの選択に使用される
 */
const PlaylistContainer: React.FC<PlaylistContainerProps> = ({ onSelectPlaylist }) => {
  // プレイリスト一覧のstate
  const [playlists, setPlaylists] = useState<PlaylistSummary[]>([]);
  // 現在選択中のプレイリストID
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  // クライアントサイドでのレンダリングを確認するためのstate
  const [isClient, setIsClient] = useState(false);

  // クライアントサイドでのレンダリングを確認
  useEffect(() => {
    setIsClient(true);
  }, []);

  // プレイリスト一覧をlocalStorageから読み込む
  useEffect(() => {
    if (!isClient) return; // クライアントサイドでのみ実行

    const loadPlaylists = () => {
      try {
        const savedPlaylists = localStorage.getItem('playlists');
        if (savedPlaylists) {
          const parsedPlaylists = JSON.parse(savedPlaylists) as PlaylistSummary[];
          setPlaylists(parsedPlaylists);
          
          // 前回選択していたプレイリストがあれば復元
          const lastSelectedId = localStorage.getItem('selectedPlaylistId');
          if (lastSelectedId && parsedPlaylists.some(p => p.id === lastSelectedId)) {
            setSelectedPlaylistId(lastSelectedId);
            onSelectPlaylist(lastSelectedId);
          } else if (parsedPlaylists.length > 0) {
            // デフォルトでは最初のプレイリストを選択
            setSelectedPlaylistId(parsedPlaylists[0].id);
            onSelectPlaylist(parsedPlaylists[0].id);
          }
        }
      } catch (error) {
        console.error('プレイリストの読み込みに失敗しました', error);
        setPlaylists([]);
      }
    };

    loadPlaylists();
    
    // localStorageの変更を監視（他のタブでの変更を検出）
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'playlists') {
        loadPlaylists();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isClient, onSelectPlaylist]);

  // プレイリスト選択時の処理
  const handleSelectPlaylist = useCallback((playlistId: string) => {
    setSelectedPlaylistId(playlistId);
    localStorage.setItem('selectedPlaylistId', playlistId);
    onSelectPlaylist(playlistId);
  }, [onSelectPlaylist]);

  // プレイリスト作成時の処理
  const handlePlaylistCreated = useCallback((playlistId: string) => {
    // 作成されたプレイリストを選択状態に
    setSelectedPlaylistId(playlistId);
    onSelectPlaylist(playlistId);
    
    // プレイリスト一覧を更新
    const savedPlaylists = localStorage.getItem('playlists');
    if (savedPlaylists) {
      setPlaylists(JSON.parse(savedPlaylists));
    }
  }, [onSelectPlaylist]);

  // サーバーサイドレンダリング時またはクライアントサイドでの初期レンダリング時
  if (!isClient) {
    return (
      <div className={styles.playlistListContainer}>
        <div className={styles.noPlaylists}>
          <p>プレイリストを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.playlistListContainer}>
      {playlists.length === 0 ? (
        <div className={styles.noPlaylists}>
          <p>プレイリストがありません</p>
          <p className={styles.noPlaylistsHint}>「＋」ボタンから作成できます</p>
        </div>
      ) : (
        <ul className={styles.playlistList}>
          {playlists.map((playlist) => (
            <li 
              key={playlist.id}
              className={`${styles.playlistItem} ${selectedPlaylistId === playlist.id ? styles.selected : ''}`}
              onClick={() => handleSelectPlaylist(playlist.id)}
            >
              {playlist.name}
            </li>
          ))}
        </ul>
      )}
      
      {/* プレイリスト作成ボタンをプレイリスト一覧の最下部に配置 */}
      <div className={styles.createButtonContainer}>
        <CreatePlaylistButton onPlaylistCreated={handlePlaylistCreated} />
      </div>
    </div>
  );
};

export default PlaylistContainer;