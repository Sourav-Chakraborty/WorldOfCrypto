import React from 'react'
import millify from 'millify';

import {useGetExchangesQuery} from "../Services/cryptoApi"
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import Loader from './Loader';
const { Text } = Typography;
const { Panel } = Collapse;
export default function Exchanges() {
    const {data,isFetching}=useGetExchangesQuery()
    if(isFetching)
        return <Loader/>
    const exchanges=data?.data?.exchanges

    
    return (
        <div>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <div>
               { exchanges.map((coin)=>(
                    <Collapse>
                        <Panel showArrow={false} header={(
                            <Row>
                            <Col span={6}>
                                 <Text><strong>{coin.rank}.</strong></Text>
                                 <Avatar className="exchange-image" src={coin.iconUrl} />
                                 <Text><strong>{coin.name}</strong></Text>
                            </Col>
                            <Col span={6}>
                            {millify(coin.volume)}
                            </Col>
                            <Col span={6}>
                                {millify(coin.numberOfMarkets)}
                            </Col>
                            <Col span={6}>
                            {millify(coin.marketShare)}%
                            </Col>
                            </Row>
                        )} key={coin.id}>
                        {HTMLReactParser(coin.description || '')}
                        </Panel>
                    </Collapse>
               ))}
                    
            </div>
        </div>
    )
}
