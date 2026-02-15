"use client";

import { useParams } from "next/navigation";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";

import { IDiplomacyDetail } from "@/interfaces/deplomacy";
import DiplomacyApiFactory from "@/service/frontend/DiplomacyApiFactory";

import media from "@/styles/media";
import Portal from "@/components/_common/modal/Portal";
import { Modal } from "@/components/_common/modal/Modal";
import { Loading } from "@/components/_common/loading/Loading";

const StyledContainer = styled.div`
  padding: 1.5rem;
  min-width: 30rem;

  .container {
    min-height: 560px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    .header {
      width: 100%;

      button {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 0.75rem;
        border: none;
      }
    }
    .body {
      width: 100%;
      overflow-y: auto;
      display: flex;
      flex-direction: row;

      ${media.medium`
      flex-direction: column;
        `}

      .flag {
        max-width: 20rem;
        width: 100%;
        border: 1px solid #dadada;
        margin-bottom: auto;
        img {
          width: 100%;
        }
      }
      .infoSection {
        margin-left: 1.875rem;
        font-size: 0.813rem;

        h3 {
          font-size: 1.75rem;
          margin-bottom: 1.875rem;
        }

        .row {
          display: flex;
          height: 2.25rem;
          line-height: 2.25rem;

          .label {
            width: 7.5rem;
            flex: none;
          }
        }
      }
    }
  }
`;

interface IInfoContainer {
  country: string;
  handleClick: () => void;
}

const InfoContainer = (props: IInfoContainer) => {
  const params = useParams();

  const { data, isError, isLoading, isFetching } =
    useQuery<IDiplomacyDetail | null>({
      queryKey: ["get-diplomacy-detail-country", params.country],
      queryFn: async () => {
        const res = await DiplomacyApiFactory.getDiplomacyDetail(
          (props?.country as string) || ""
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await res.json();
        console.log("data", data);
        if (res.status === 200) {
          //return res.data;
          return {
            flag: data.flag.response.body.items.item[0],
            economy: data.economy.response.body.items.item[0],
            general: data.general.response.body.items.item[0],
          };
        }
        return null;
      },
    });

  const isLoadingCheck = isFetching || isLoading;

  return (
    <Portal>
      <Modal size="lg">
        <StyledContainer>
          <div className="container">
            <div className="header">
              <IconButton onClick={() => props.handleClick()}>
                <ClearIcon />
              </IconButton>
            </div>
            {!isLoadingCheck && !isError && data && (
              <div className="body">
                {data.flag?.download_url && (
                  <div className="flag">
                    <img src={data.flag?.download_url} alt="country-flag" />
                  </div>
                )}
                <div className="infoSection">
                  <h3>{data.economy.country_nm}</h3>
                  <div className="row">
                    <div className="label">Name</div>
                    <div className="value">{data.economy?.country_nm}</div>
                  </div>
                  <div className="row">
                    <div className="label">Name (eng)</div>
                    <div className="value">{data.economy.country_eng_nm}</div>
                  </div>
                  <div className="row">
                    <div className="label">Language</div>
                    <div className="value">{data.general.lang}</div>
                  </div>
                  <div className="row">
                    <div className="label">Capital</div>
                    <div className="value">{data.general.capital}</div>
                  </div>
                  {data.general.climate && (
                    <div className="row">
                      <div className="label">Climate</div>
                      <div className="value">{data.general.climate}</div>
                    </div>
                  )}
                  <div className="row">
                    <div className="label">Area</div>
                    <div className="value">{data.general.area}</div>
                  </div>
                  <div className="row">
                    <div className="label">GDP</div>
                    <div className="value">{data.economy.gdp}</div>
                  </div>
                  <div className="row">
                    <div className="label">Import</div>
                    <div className="value">{data.economy.import_amount}</div>
                  </div>
                  <div className="row">
                    <div className="label">Export</div>
                    <div className="value">{data.economy.export_amount}</div>
                  </div>
                  <div className="row">
                    <div className="label">Currency</div>
                    <div className="value">{data.economy.currency_unit}</div>
                  </div>
                  <div className="row">
                    <div className="label">Population</div>
                    <div className="value">{data.general.population}</div>
                  </div>
                  {data.economy.main_resource && (
                    <div className="row">
                      <div className="label">Resource</div>
                      <div className="value">{data.economy.main_resource}</div>
                    </div>
                  )}
                  {data.economy.main_industry && (
                    <div className="row">
                      <div className="label">Industry</div>
                      <div className="value">{data.economy.main_industry}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {isLoadingCheck && <Loading />}
          </div>
        </StyledContainer>
      </Modal>
    </Portal>
  );
};

export default InfoContainer;
