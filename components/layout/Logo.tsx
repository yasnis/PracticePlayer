"use client";

import React from 'react';
import Image from 'next/image';
import styles from '../../styles/Logo.module.css';

/**
 * アプリケーションのロゴコンポーネント
 * 左パネル最上部に表示される
 */
const Logo: React.FC = () => {
  return (
    <div className={styles.logoContainer}>
      <Image
        src="/practiceplayer/assets/logo_2line_white.svg"
        alt="Practice Player"
        width={140}
        height={50}
        priority
        className={styles.logo}
      />
    </div>
  );
};

export default Logo;