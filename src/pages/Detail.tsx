import { useParams } from 'react-router-dom';
import DocumentDetail from '../components/DocumentDetail';
import HeaderMainFooter from '../templates/HeaderMainFooter';

function Detail() {
    let { id, type } = useParams();

    return (<HeaderMainFooter >
        <div className="w-full max-w-4xl mx-auto">
            <DocumentDetail id={id} type={type} />
        </div>
    </HeaderMainFooter >);
}

export default Detail;
