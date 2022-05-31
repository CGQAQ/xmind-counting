import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import BillTable from "../components/BillTable";
import SearchForm from "../components/SearchForm";

import Button from "@mui/material/Button";

import getMonth from "date-fns/getMonth";
import NewBillDialog from "../components/NewBillDialog";

export default function Home() {
  const [bill, setBill] = useState<
    Array<{
      type: number;
      time: number;
      category: string;
      amount: number;
    }>
  >([]);

  const [categories, setCategories] = useState<
    Array<{
      id: string;
      type: number;
      name: string;
    }>
  >([]);

  const [filterData, setFilterData] = useState<{
    category: string;
    month: string;
  }>({ category: "*", month: "*" });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    let didCancel = false;

    async function init() {
      const billResp = await (await fetch("/bill.csv")).text();
      const cateResp = await (await fetch("/categories.csv")).text();
      if (!didCancel) {
        // Ignore if we started fetching something else
        // type, time, category, amount;
        setBill(
          billResp
            .split("\n")
            .slice(1)
            .map((it) => {
              const [type, time, category, amount] = it.split(",");
              return {
                type: Number(type),
                time: Number(time),
                category,
                amount: Number(amount),
              };
            })
            .filter(
              (it) =>
                (filterData.category === "*" ||
                  it.category === filterData.category) &&
                (filterData.month === "*" ||
                  getMonth(it.time) + 1 === Number(filterData.month))
            )
        );

        setCategories(
          cateResp
            .split("\n")
            .slice(1)
            .map((it) => {
              const [id, type, name] = it.split(",");
              return { id, type: Number(type), name };
            })
        );
      }
    }

    init();

    return () => {
      didCancel = true;
    }; // Remember if we start fetching something else
  }, [filterData]);

  function onCategoryChange(category: string) {
    setFilterData((it) => ({ ...it, category }));
  }

  function onMonthChange(month: string) {
    setFilterData((it) => ({ ...it, month }));
  }

  function openBillDialog() {
    setOpen(true);
  }

  function closeBillDialog() {
    setOpen(false);
  }

  function discardNewBill() {
    closeBillDialog();
  }

  function createNewBill(bill: Bill) {
    setBill((it) => [...it, bill]);
    closeBillDialog();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>

      <main className={styles.main}>
        <section>
          <SearchForm
            categories={categories}
            onCategoryChange={onCategoryChange}
            onMonthChange={onMonthChange}
          />
          <BillTable data={bill} categories={categories} />
        </section>

        <NewBillDialog
          open={open}
          categories={categories}
          onDiscard={discardNewBill}
          onCreate={createNewBill}
        />

        <Button sx={{ marginTop: 1 }} onClick={openBillDialog}>
          Adding bill
        </Button>
      </main>
    </div>
  );
}
