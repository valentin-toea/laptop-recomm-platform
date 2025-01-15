"use client";
import React, { useEffect, useState } from "react";
import { useUserData } from "../../hooks/useUserData";
import {
  calculatePreferredBrandFromDetailViews,
  calculatePurchaseFrequency,
} from "../../actions/user-actions";
import { Stack } from "@mantine/core";

const page = () => {
  const { mainUser } = useUserData();
  const userId = mainUser.userId;

  const [pref, setPref] = useState<{ [key: string]: any }>({});
  const [freq, setFreq] = useState<number>();

  useEffect(() => {
    const getData = async () => {
      const p = await calculatePreferredBrandFromDetailViews(userId);
      setPref(p);
      console.log(userId);
      const f = await calculatePurchaseFrequency(userId);
      setFreq(f);
    };
    getData();
  }, []);

  console.log(mainUser);
  return (
    <Stack>
      {freq === undefined || pref.preferredBrand === undefined ? (
        <p>loading...</p>
      ) : (
        <>
          <h2>Preferred Brand: {pref.preferredBrand}</h2>
          <h2>Preferred CPU: {pref.preferredCPU}</h2>
          <h2>
            Preferred Screen Size: {Number(pref.preferredScreen).toFixed(1)}
          </h2>
          <h2>Purchases per day: {freq}</h2>
        </>
      )}
    </Stack>
  );
};

export default page;