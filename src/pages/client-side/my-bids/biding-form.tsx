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
  PanaSubType,
  GAME_TYPE_LIST,
  PANA_SUB_LIST,
  generateAnkDigits,
  generateJodiDigitPairs,
  generatePanaDigits,
  BID_TYPE_OPTIONS,
} from "./types";

import { biddingSchema, BiddingFormSchema } from "@/utils/validation";

import "./bidding.css";

interface BiddingFormProps {
  onAddBid: (bid: { bidType?: string | null; digits: string; points: number , gameType: string}) => void;
}

const BiddingForm: React.FC<BiddingFormProps> = ({ onAddBid }) => {
  const methods = useForm<BiddingFormSchema>({
    resolver: yupResolver(biddingSchema as any),
    mode: "onChange",
    defaultValues: {
      gameType: GameType.ANK,
      panaSub: PanaSubType.SPANA,
      digits: "",
      bidType: "",
      points: undefined,
    },
  });

  const { handleSubmit, watch } = methods;

  const gameType = watch("gameType");
  const panaSub = watch("panaSub");

  const getDigitOptions = () => {
    switch (gameType) {
      case GameType.ANK:
        return generateAnkDigits();
      case GameType.JODI:
        return generateJodiDigitPairs();
      case GameType.PANA:
        return generatePanaDigits(panaSub);
      default:
        return [];
    }
  };

  const onSubmit = (data: BiddingFormSchema) => {
    onAddBid({
      gameType: data.gameType !== GameType.PANA ? data?.gameType :(data?.panaSub || data.gameType),
      bidType: data.gameType !== GameType.JODI ? data.bidType : null,
      digits: data.digits,
      points: data.points as number,
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

        {/* Pana Sub Type - Only show for PANA */}
        {gameType === GameType.PANA && (
          <>
            <div className="game-type-title">Select Game Sub Type</div>
            <div className="sub-type-options">
              <CommonRadioGroup
                name="panaSub"
                options={PANA_SUB_LIST.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </div>
          </>
        )}

        <div className="bidding-form-row">
          {/* Digits Dropdown */}
          <div className="bid-field">
            <CommonLabel label="Digits" required />

            <CommonSelect
              name="digits"
              placeholder="Select Digit"
              options={getDigitOptions().map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </div>

          {/* Bid Type Dropdown - Only show for ANK and PANA */}
          {(gameType === GameType.ANK || gameType === GameType.PANA) && (
            <div className="bid-field">
              <CommonLabel label="Bid Type" required />

              <CommonSelect
                name="bidType"
                placeholder="Select Bid Type"
                options={BID_TYPE_OPTIONS.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </div>
          )}

          {/* Points - Manual Entry */}
          <div className="bid-field">
            <CommonLabel label="Points" required />

            <CommonInput
              name="points"
              type="number"
              placeholder="Enter Points (positive number)"
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
