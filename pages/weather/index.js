import { useEffect, useState, Fragment } from 'react';
import { Row, Col, Card, Input, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import MasterLayout from '../../components/MasterLayout';
import { getCurrentWeather } from '../../services/ApiCall';
import { objToParams, showSwalLoading, showError } from '../../services/Helper';
import { URLWEATHER_IMG } from '../../constants'

function WeatherPage(props) {
    const [formData, setFormData] = useState({})
    const [currentWeather, setCurrentWeather] = useState({})

    useEffect(() => {
        setCurrentWeather(props.currentWeather)
        setFormData({
            ...formData,
            q: props.q
        })
    }, [])

    const convertKelvin = (temp = 0) => {
        return Number(Number(temp) - 273.15).toFixed(2);
    }

    const convertUnixTimestamp = (unix = 0) => {
        let time = new Date(unix * 1000)
        return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }

    const handleSubmit = async (e) => {
        try {    
            e.preventDefault()
            const { q } = formData
            showSwalLoading()
            const currentWeather = await getCurrentWeather(objToParams({ q }));
            setCurrentWeather(currentWeather)
            Swal.close()
        } catch (err) {
            showError(err);
        }
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
            <h3>Enter City</h3>
            <form id="form-search" onSubmit={handleSubmit}>
                <Input
                    placeholder="Enter City"
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
            <Row className="mt-3">
                <Col md="12" lg="12">
                    <Card className="bg-blue--gn text-white">
                        <div className="p-4">
                            <Row>
                                <Col lg="6" md="6">
                                    <h2>{currentWeather.name || ''}</h2>
                                    {(() => {
                                        if (currentWeather.weather) {
                                            const { weather } = currentWeather
                                            return weather.map((item, index) => {
                                                return (
                                                    <div key={`some-${index}`}>
                                                        <span>{item.main}</span> <img src={URLWEATHER_IMG + item.icon + '.png'} width="30" />
                                                        <div><small>{item.description}</small></div>
                                                    </div>
                                                );
                                            })
                                        }
                                    })()}
                                </Col>
                                <Col style={{ color: '#83BCFF' }} lg="6" md="6">
                                    <h5>Temp {currentWeather.main ? convertKelvin(currentWeather.main.temp) : ''}&#730;C, Feels Like {currentWeather.main ? convertKelvin(currentWeather.main.feels_like) : ''}&#730;C</h5>
                                    <div>
                                        <small>Humidity {currentWeather.main ? currentWeather.main.humidity : ''}%</small>,
                                        &nbsp;<small>Wind {currentWeather.wind ? currentWeather.wind.speed : ''} km/h</small>,
                                        &nbsp;<small>Sunrise {currentWeather.sys ? convertUnixTimestamp(Number(currentWeather.sys.sunrise)) : ''}</small>,
                                        &nbsp;<small>Sunset {currentWeather.sys ? convertUnixTimestamp(Number(currentWeather.sys.sunset)) : ''}</small>
                                    </div>
                                    <div>
                                        <small>Lat {currentWeather.coord ? currentWeather.coord.lat : ''}</small>,
                                        &nbsp;<small>Lon {currentWeather.coord ? currentWeather.coord.lon : ''}</small>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>

            <style jsx global>
                {`
                    .card {
                        min-height: 150px !important;
                    }
                    .icon--cloud {
                        font-size: 9rem;
                        position: absolute;
                        left: 84%;
                    }
                    .bg-blue--gn {
                        background: rgb(108,207,246);
                        background: linear-gradient(90deg, rgba(108,207,246,1) 0%, rgba(51,102,153,1) 100%);
                        border: unset;
                        color: #336699 !important;
                        font-weight: bold;
                    }
                `}
            </style>
        </MasterLayout>
    )
}

export async function getStaticProps(context) {
    try {
        let q = 'Jakarta'
        let getWeather = await getCurrentWeather(objToParams({
            q
        }))

        return {
            props: {
                currentWeather: getWeather,
                q
            }
        }
    } catch (err) {
        console.error(err)
    }
}

export default WeatherPage;
