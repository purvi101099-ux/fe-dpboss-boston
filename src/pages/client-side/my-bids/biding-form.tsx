import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CommonInput from "@/components/common/commonInput";
import CommonSelect from "@/components/common/CommonSelect";
import CommonButton from "@/components/common/commonButton";
import CommonLabel from "@/components/common/CommonLabel";
import CommonRadioGroup from "@/components/common/CommonRadioGroup";

import {
  GameType,
  AnkSubType,
  JodiSubType,
  PanaSubType,
  GAME_TYPE_LIST,
  JODI_SUB_LIST,
  PANA_SUB_LIST,
  ANK_SELECT_OPTIONS,
  JODI_SELECT_OPTIONS,
  PANA_SELECT_OPTIONS,
  POINTS_OPTIONS,
  INPUT_PLACEHOLDERS,
} from "./types";

import { biddingSchema, BiddingFormSchema } from "@/utils/validation";

import "./bidding.css";

interface BiddingFormProps {
  onAddBid: (bid: { bidType: string; digits: string; points: number }) => void;
}

const BiddingForm: React.FC<BiddingFormProps> = ({ onAddBid }) => {
  const methods = useForm<BiddingFormSchema>({
    resolver: yupResolver(biddingSchema as any),
    mode: "onChange",
    defaultValues: {
      gameType: GameType.ANK,
      ankSub: AnkSubType.OPEN,
      jodiSub: JodiSubType.JODI,
      panaSub: PanaSubType.SPANA,
      digits: "",
      points: "",
    },
  });

  const { handleSubmit, watch } = methods;

  const gameType = watch("gameType");

  const getBidTypeOptions = () => {
    switch (gameType) {
      case GameType.ANK:
        return ANK_SELECT_OPTIONS;

      case GameType.JODI:
        return JODI_SELECT_OPTIONS;

      case GameType.PANA:
        return PANA_SELECT_OPTIONS;

      default:
        return [];
    }
  };

  const bidTypeFieldName: "ankSub" | "jodiSub" | "panaSub" =
    gameType === GameType.ANK
      ? "ankSub"
      : gameType === GameType.JODI
        ? "jodiSub"
        : "panaSub";

  const onSubmit = (data: BiddingFormSchema) => {
    const bidType =
      gameType === GameType.ANK
        ? data.ankSub
        : gameType === GameType.JODI
          ? data.jodiSub
          : data.panaSub;

    onAddBid({
      bidType: String(bidType || ""),
      digits: data.digits,
      points: Number(data.points),
    });

    // Reset only the digits field so the user can quickly place another bid
    methods.reset({
      ...methods.getValues(),
      digits: "",
    });
  };

  return (
    <FormProvider {...methods}>
      <form className="client-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Game Type */}
        <div className="game-type-section">
          <div className="game-type-title">Select Game Type</div>

          <CommonRadioGroup
            name="gameType"
            options={GAME_TYPE_LIST.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </div>

        {gameType !== GameType.ANK && (
          <div className="game-type-title">Select Game Sub Type</div>
        )}
        {/* Jodi Sub Type */}
        {gameType === GameType.JODI && (
          <div className="sub-type-options">
            <CommonRadioGroup
              name="jodiSub"
              options={JODI_SUB_LIST.map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </div>
        )}

        {/* Pana Sub Type */}
        {gameType === GameType.PANA && (
          <div className="sub-type-options">
            <CommonRadioGroup
              name="panaSub"
              options={PANA_SUB_LIST.map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </div>
        )}

        <div className="bidding-form-row">
          {/* Digits */}
          <div className="bid-field">
            <CommonLabel label="Digits" required />

            <CommonInput
              name="digits"
              placeholder={INPUT_PLACEHOLDERS[gameType]}
            />
          </div>

          {/* Bid Type */}
          <div className="bid-field">
            <CommonLabel label="Bid Type" required />

            <CommonSelect
              name={bidTypeFieldName}
              placeholder="Select Bid Type"
              options={getBidTypeOptions().map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </div>

          {/* Points */}
          <div className="bid-field">
            <CommonLabel label="Points" required />

            <CommonSelect
              name="points"
              placeholder="Select Points"
              options={POINTS_OPTIONS.map((item) => ({
                label: String(item),
                value: String(item),
              }))}
            />
          </div>
        </div>

        <CommonButton
          htmlType="submit"
          label="+ Add Bid"
          className="add-bid-btn"
        />
      </form>
    </FormProvider>
  );
};

export default BiddingForm;
