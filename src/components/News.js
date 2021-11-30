import React, { useState, useEffect } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import { useGetCryptosQuery } from "../Services/cryptoApi";

import { useGetCryptoNewsQuery } from "../Services/cryptoNewsApi";
import moment from "moment";
const { Text, Title } = Typography;
const { Option } = Select;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

export default function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const cryptoDetails = data?.data?.coin;

  

  if (!cryptoNews?.value) return "Loading....";
 
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => (
              <Option value={currency.name}>{currency.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news) => (
        <Col xs={24} sm={12} lg={8} key={1}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreference">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  style={{ maxHeight: "200px", maxWidth: "100px" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}....`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt=""
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
