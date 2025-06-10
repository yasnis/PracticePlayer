"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from '../../styles/UsageGuideModal.module.css';

interface UsageGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 使い方ガイドモーダルコンポーネント
 * アプリケーションの使い方をスライド形式で説明するモーダルウィンドウ
 */
const UsageGuideModal: React.FC<UsageGuideModalProps> = ({ isOpen, onClose }) => {
  // ガイドスライドの内容定義
  const guideSlides = [
    {
      title: "音源のインポート方法",
      content: "「ファイルを追加」ボタンをクリックして、練習したい音楽ファイルをインポートします。MP3、WAV、M4Aなどの形式に対応しています。",
      image: "/practiceplayer/assets/guide/import.png"
    },
    {
      title: "ABループの設定方法",
      content: "練習したい区間を繰り返し再生できます。波形の下にあるA点・B点マーカーをドラッグして区間を設定し、ABループボタンをクリックすると繰り返し再生が始まります。",
      image: "/practiceplayer/assets/guide/abloop.png"
    },
    {
      title: "マーカーの追加と調整",
      content: "曲の重要なポイントにマーカーを追加できます。「+」ボタンを押してマーカーを追加し、ダブルクリックで名前を変更できます。",
      image: "/practiceplayer/assets/guide/markers.png"
    },
    {
      title: "再生速度の調整",
      content: "再生速度を変更して、ゆっくり練習することができます。再生コントロール横のスライダーで0.5倍速〜1.5倍速に調整できます。",
      image: "/practiceplayer/assets/guide/speed.png"
    },
    {
      title: "プレイリストの活用",
      content: "複数の練習曲をプレイリストとして管理できます。左パネルの「プレイリストを作成」ボタンから新規作成し、曲を追加していきましょう。",
      image: "/practiceplayer/assets/guide/playlist.png"
    }
  ];

  // 現在のスライドインデックス
  const [currentSlide, setCurrentSlide] = useState(0);
  // 次回から表示しない設定
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  
  // スワイプ処理のための状態と参照
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const currentTouchX = useRef<number | null>(null);
  const slideContentRef = useRef<HTMLDivElement>(null);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const minSwipeDistance = 50; // スワイプと認識する最小距離
  const isDraggingRef = useRef<boolean>(false);
  
  // スライドのトランジション状態
  const [isTransitioning, setIsTransitioning] = useState(false);
  // スワイプ中のオフセット
  const [swipeOffset, setSwipeOffset] = useState(0);

  // 次のスライドへ移動
  const goToNextSlide = useCallback(() => {
    if (currentSlide < guideSlides.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setSwipeOffset(0); // リセット
      setCurrentSlide(prevSlide => prevSlide + 1);
      setTimeout(() => setIsTransitioning(false), 300); // トランジション完了後にフラグをリセット
    }
  }, [currentSlide, guideSlides.length, isTransitioning]);

  // 前のスライドへ移動
  const goToPrevSlide = useCallback(() => {
    if (currentSlide > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setSwipeOffset(0); // リセット
      setCurrentSlide(prevSlide => prevSlide - 1);
      setTimeout(() => setIsTransitioning(false), 300); // トランジション完了後にフラグをリセット
    }
  }, [currentSlide, isTransitioning]);

  // タッチ開始イベントの処理
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isTransitioning) return;
    
    touchStartX.current = e.touches[0].clientX;
    currentTouchX.current = touchStartX.current;
    isDraggingRef.current = true;
    
    // トランジションを一時的に無効化
    if (slidesContainerRef.current) {
      slidesContainerRef.current.style.transition = 'none';
    }
  }, [isTransitioning]);

  // タッチ移動イベントの処理
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    
    currentTouchX.current = e.touches[0].clientX;
    const diff = currentTouchX.current - touchStartX.current;
    
    // 最初/最後のスライドでの移動範囲を制限
    if ((currentSlide === 0 && diff > 0) || 
        (currentSlide === guideSlides.length - 1 && diff < 0)) {
      // 抵抗を加える（移動量を減らす）
      setSwipeOffset(diff * 0.3);
    } else {
      setSwipeOffset(diff);
    }
  }, [currentSlide, guideSlides.length]);

  // タッチ終了イベントの処理
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    
    touchEndX.current = e.changedTouches[0].clientX;
    isDraggingRef.current = false;
    
    // トランジションを再度有効化
    if (slidesContainerRef.current) {
      slidesContainerRef.current.style.transition = 'transform 0.3s ease-out';
    }
    
    handleSwipe();
  }, []);

  // マウスドラッグ用のイベント処理
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isTransitioning) return;
    
    touchStartX.current = e.clientX;
    currentTouchX.current = touchStartX.current;
    isDraggingRef.current = true;
    
    // トランジションを一時的に無効化
    if (slidesContainerRef.current) {
      slidesContainerRef.current.style.transition = 'none';
    }
    
    // マウスの移動とマウスアップのイベントリスナーを追加
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      
      currentTouchX.current = e.clientX;
      const diff = currentTouchX.current - touchStartX.current;
      
      // 最初/最後のスライドでの移動範囲を制限
      if ((currentSlide === 0 && diff > 0) || 
          (currentSlide === guideSlides.length - 1 && diff < 0)) {
        // 抵抗を加える（移動量を減らす）
        setSwipeOffset(diff * 0.3);
      } else {
        setSwipeOffset(diff);
      }
    };
    
    const handleMouseUp = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      
      touchEndX.current = e.clientX;
      isDraggingRef.current = false;
      
      // トランジションを再度有効化
      if (slidesContainerRef.current) {
        slidesContainerRef.current.style.transition = 'transform 0.3s ease-out';
      }
      
      handleSwipe();
      
      // リスナーを削除
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [currentSlide, guideSlides.length, isTransitioning]);

  // スワイプ動作の処理 - 範囲チェックを強化
  const handleSwipe = useCallback(() => {
    const distance = touchEndX.current - touchStartX.current;
    
    // スワイプオフセットをリセット
    setSwipeOffset(0);
    
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // 右にスワイプ -> 前のスライド (最初のスライドより前には行かない)
        if (currentSlide > 0) {
          goToPrevSlide();
        }
      } else {
        // 左にスワイプ -> 次のスライド (最後のスライドより後ろには行かない)
        if (currentSlide < guideSlides.length - 1) {
          goToNextSlide();
        }
      }
    }
  }, [goToNextSlide, goToPrevSlide, currentSlide, guideSlides.length]);

  // ドラッグキャンセル処理（範囲外クリック時など）
  const cancelDrag = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setSwipeOffset(0);
      
      if (slidesContainerRef.current) {
        slidesContainerRef.current.style.transition = 'transform 0.3s ease-out';
      }
    }
  }, []);

  // モーダルを閉じる際の処理
  const handleClose = useCallback(() => {
    // ドラッグ中なら中止
    cancelDrag();
    
    // 「次回から表示しない」が選択されていれば、その設定を保存
    if (doNotShowAgain) {
      localStorage.setItem('guide_shown', 'true');
    }
    onClose();
  }, [doNotShowAgain, onClose, cancelDrag]);

  // キーボードイベントの処理（Escキーで閉じる、矢印キーでスライド移動）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowRight':
          goToNextSlide();
          break;
        case 'ArrowLeft':
          goToPrevSlide();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose, goToNextSlide, goToPrevSlide]);

  // モーダルが開かれたらスライドを最初に戻す
  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  // currentSlideの値が範囲外にならないよう安全対策
  const safeCurrentSlide = Math.max(0, Math.min(currentSlide, guideSlides.length - 1));

  // スライド位置の計算
  const getSlideTransform = () => {
    const baseTransform = `translateX(${-safeCurrentSlide * 100}%)`;
    if (swipeOffset !== 0) {
      const containerWidth = slidesContainerRef.current?.clientWidth || 1;
      // スワイプ量に応じたオフセットを追加
      const offsetPercent = (swipeOffset / containerWidth) * 100;
      return `translateX(calc(${-safeCurrentSlide * 100}% + ${offsetPercent}%))`;
    }
    return baseTransform;
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        {/* 閉じるボタン */}
        <button className={styles.closeButton} onClick={handleClose} aria-label="閉じる">
          ×
        </button>

        {/* スライドコンテナ - 水平スクロール用 */}
        <div 
          className={styles.slidesViewport}
          ref={slideContentRef}
        >
          <div 
            ref={slidesContainerRef}
            className={styles.slidesContainer}
            style={{ 
              transform: getSlideTransform(),
              transition: isTransitioning ? 'transform 0.3s ease-out' : undefined
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
          >
            {guideSlides.map((slide, index) => (
              <div key={index} className={styles.slideContent}>
                <h2 className={styles.slideTitle}>{slide.title}</h2>
                
                <div className={styles.slideImageContainer}>
                  {slide.image ? (
                    <div className={styles.imageWrapper}>
                      <div className={styles.imagePlaceholder}>
                        {/* 実際の画像が用意されたら以下のコメントを外す */}
                        {/* <Image 
                          src={slide.image}
                          alt={slide.title}
                          fill
                          style={{ objectFit: 'contain' }}
                        /> */}
                        <p>画像がここに表示されます</p>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <p>画像がありません</p>
                    </div>
                  )}
                </div>
                
                <p className={styles.slideDescription}>{slide.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ナビゲーションボタン */}
        <div className={styles.slideNavigation}>
          <button 
            className={`${styles.navButton} ${safeCurrentSlide === 0 ? styles.disabled : ''}`}
            onClick={goToPrevSlide}
            disabled={safeCurrentSlide === 0}
            aria-label="前のスライド"
          >
            ←
          </button>
          
          {/* スライドインジケーター */}
          <div className={styles.slideIndicators}>
            {guideSlides.map((_, index) => (
              <button
                key={index}
                className={`${styles.slideIndicator} ${index === safeCurrentSlide ? styles.active : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`スライド ${index + 1} へ移動`}
              />
            ))}
          </div>
          
          <button 
            className={`${styles.navButton} ${safeCurrentSlide === guideSlides.length - 1 ? styles.disabled : ''}`}
            onClick={goToNextSlide}
            disabled={safeCurrentSlide === guideSlides.length - 1}
            aria-label="次のスライド"
          >
            →
          </button>
        </div>

        {/* フッター（表示設定） */}
        <div className={styles.modalFooter}>
          <label className={styles.doNotShowLabel}>
            <input
              type="checkbox"
              checked={doNotShowAgain}
              onChange={() => setDoNotShowAgain(!doNotShowAgain)}
            />
            次回から表示しない
          </label>
        </div>
      </div>
    </div>
  );
};

export default UsageGuideModal;