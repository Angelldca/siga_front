import bannerImage from '../../assets/banner.jpg';
import chef from '../../assets/chef2.jpg';
import FormIncidencia from '../../components/form_incidencia/form_incidencia';

import Menu from '../../components/menu/menu';
import './landing.css'
const Landing = () => {
    return (
        <div className="landing-container">
            <div className="landing-intro">
                <div>
                    <h1>Documentation Theme By Themefisher Team</h1>
                    <p>Lorem ipsum dolor amet, consetetur sadiffspscing elitr, diam nonumy invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua At.</p>
                </div>
                <img src={bannerImage} alt="Banner" />
            </div>
            <div className='menu-list'>
                <h2>Menus disponibles</h2>
                <div className='test'>

                    <img src={chef} alt="chef" className='img-chef' />
                    <div className='menu-view'>
                        <Menu />
                        <Menu />
                        <Menu />
                        <Menu />
                        <Menu />
                        <Menu />
                    </div>

                </div>

            </div>
            <div>
                <FormIncidencia/>
            </div>
        </div>
    )
}

export default Landing;