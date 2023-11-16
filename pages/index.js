import Head from 'next/head'
import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import { LiffContext } from "./_app";
import { createMicrocmsClient } from "../lib/microcmsClient";
import { createRandomStaff, createStaff } from "../lib/useStaff"
import { deleteReservation } from "../lib/useReservations"
import { useState, useContext, useEffect } from 'react';
import { List, ListItem, IconButton, Button, Container, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { lineNotify } from "../lib/lineNotify";
import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import { getPreviousReservations, dateToString } from "../lib/util";

export default function Home({ /* ... */ }) {
  const { liffObject: liff, profile, setLiffState } = useContext(LiffContext);

  return <Layout home user={profile}>
    <Container>
      { profile ?
        <Button
          onClick={() => { liff.logout(); setLiffState([liff, null]) }}
        >ログアウト</Button> :
        <Button
          onClick={() => { liff.login({}) }}
        >ログイン</Button>
      }
    </Container>
  </Layout>
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const client = createMicrocmsClient({
    serviceDomain: process.env.SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
  });
  const staffsData = await client.get({ endpoint: "staffs" });

  return {
    props: {
      _staffs: staffsData.contents,
      serviceDomain: process.env.SERVICE_DOMAIN,
      apiKey: process.env.MICROCMS_API_KEY,
      liffId: process.env.LIFF_ID
    },
  };
};