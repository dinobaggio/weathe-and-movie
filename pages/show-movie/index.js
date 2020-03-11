import { useEffect, useState, Fragment } from 'react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { Input, Button, Row, Col, Card, CardBody, CardHeader } from 'reactstrap'
import {MasterLayout} from '../../components'
import {getShowsMovie} from '../../services/ApiCall'
import { objToParams, showSwalLoading } from '../../services/Helper'
import Swal from 'sweetalert2'

const DetailLink = function(props) {
    return (
        <Link href={`/show-movie/detail/${props.id}`}>
            <a onClick={props.onClick}>
                <Card className="text-center">
                    <CardHeader>
                        <img
                            src={props.image ? props.image.medium : ''}
                            width="90%"
                        />
                    </CardHeader>
                    <CardBody>
                        {props.name}
                    </CardBody>
                </Card>
            </a>
            
        </Link>
    )
}

function ShowBatman(props) {
    const [shows, setShows] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setShows(props.shows)
        setFormData({
            ...formData,
            q: formData.q || props.q
        })
    }, [props.shows])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { q } = formData
        showSwalLoading()
        const getShows = await getShowsMovie(objToParams({ q }));
        setShows(getShows.map(entry => (entry.show)))
        Swal.close()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <MasterLayout>
            <h3>Search Movie</h3>
            <form id="form-search" onSubmit={handleSubmit}>
                <Input
                    placeholder="Seach Movie"
                    name="q"
                    onChange={handleChange}
                    value={formData.q || ''}
                />

                <div className="mt-2 text-right">
                    <Button onClick={() => setFormData({})} size="sm" color="info"  className="text-right">
                        <i className="fa fa-refresh" /> Clear
                    </Button> &nbsp;
                    <Button type="submit" size="sm" color="primary"  className="text-right">
                        <i className="fa fa-search" /> Search
                    </Button>
                </div>
            </form>

            <Row>
                {Array.isArray(shows) && shows.map((entry, index) => {
                    return (
                        <Col key={`detailink--${index}`} className="mt-3" lg="4" md="4">
                            <DetailLink {...entry} />
                        </Col>
                    )
                })}
                {Array.isArray(shows) && shows.length <= 0 && (
                    <div style={{ width: '100%', opacity: '0.7' }} className="bg-secondary rounded mt-3">
                        <h6 className="text-center text-white no--result">No Result.</h6>
                    </div>
                )}
            </Row>
        </MasterLayout>
    )
}

export async function getStaticProps() {
    const q = 'Spider man'
    const getShows = await getShowsMovie(objToParams({
        q
    }))

    return {
        props: {
            shows: getShows.map(entry => entry.show),
            q
        }
    }
}

export default ShowBatman
