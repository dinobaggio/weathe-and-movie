import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardBody, Row, Col, Table, Button } from 'reactstrap';
import { MasterLayout } from '../../../components';
import { getShowDetail } from '../../../services/ApiCall';

const Detail = function (props) {
    // const router = useRouter();
    // console.log(props.detail, '===')
    return (
        <MasterLayout>
            <Card>
                <CardHeader
                    className="text-center"
                >
                    <img width="40%" src={props.detail.image ? props.detail.image.medium : ''} />
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col lg="6" md="6">
                            <h1>{props.detail.name}</h1>
                            <p>{ props.detail.summary ? props.detail.summary.replace(/<[/]?[pb]>/g, '') : ''}</p>
                        </Col>
                        <Col lg="6" md="6">
                            <h5>Show info</h5>
                            <Table>
                                <tbody>
                                    <tr>
                                        <th>Genres</th>
                                        <th>:</th>
                                        <td>
                                            {Array.isArray(props.detail.genres) && props.detail.genres.map((item, index) => (
                                                <Fragment
                                                    key={`genres--${index}`}
                                                >
                                                    &nbsp;
                                                    <Button
                                                        outline
                                                        color="success"
                                                        className="rounded-pill"
                                                        size="sm"
                                                    >{item}</Button>
                                                </Fragment>
                                            ))}
                                            {!Array.isArray(props.detail.genres) || props.detail.genres.length <= 0 && (
                                                <span className="text-secondary">No genres.</span>
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Premiered</th>
                                        <th>:</th>
                                        <td>{props.detail.premiered || (<span className="text-secondary">No premiered.</span>)}</td>
                                    </tr>
                                    <tr>
                                        <th>Network</th>
                                        <th>:</th>
                                        <td>{(() => {
                                            if (props.detail && props.detail.network) {
                                                const { network } = props.detail
                                                const { name, country } = network

                                                return (
                                                    <span>
                                                        {name}
                                                    </span>
                                                )
                                            }
                                            return (<span className="text-secondary">No network.</span>)
                                        })()}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <style>{`
                .table th, .table td {
                    border-top: unset;
                }
                h5 {
                    font-weight: bold;
                }
            `}</style>
        </MasterLayout>
    )
};
 
Detail.getInitialProps = async function (context) {
    try {
        const { id } = context.query
        const showDetail = await getShowDetail(id)
        return {
            detail: showDetail
        }
    } catch (err) {
        console.error(err)
        return {}
    }
}

export default Detail;