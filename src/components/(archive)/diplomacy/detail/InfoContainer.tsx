"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { IDiplomacyDetail } from "@/interfaces/deplomacy";
import DiplomacyApiFactory from "@/service/frontend/DiplomacyApiFactory";
import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 24px;

  .container {
    .header {
      button {
        font-size: 10px;
      }
    }
    .body {
      display: flex;
      .flag {
        max-width: 320px;
        width: 100%;
        img {
          width: 100%;
        }
      }
      .infoSection {
        margin-left: 30px;
        font-size: 13px;

        h3 {
          font-size: 28px;
          margin-bottom: 30px;
        }

        .row {
          display: flex;
          height: 36px;
          line-height: 36px;
          .label {
            width: 120px;
            flex: none;
          }
        }
      }
    }
  }
`;

const InfoContainer = () => {
  const params = useParams();
  const router = useRouter();

  const { data, isError } = useQuery<IDiplomacyDetail>({
    queryKey: ["get-diplomacy-detail-country", params.country],
    queryFn: async () => {
      const res = await DiplomacyApiFactory.getDiplomacyDetail(
        (params?.country as string) || ""
      );
      if (res.status === 200) {
        return res.data;
      }
      return null;
    },
  });
  console.log("data", data);
  console.log("isError", isError);

  return (
    <StyledContainer>
      {!isError && data && (
        <div className="container">
          <div className="header">
            <button onClick={() => router.push("/diplomacy")}>목록으로</button>
          </div>
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
                <div className="value">{data.economy.country_nm}</div>
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
              <div className="row">
                <div className="label">Climate</div>
                <div className="value">{data.general.climate}</div>
              </div>
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
        </div>
      )}
    </StyledContainer>
  );
};

export default InfoContainer;
