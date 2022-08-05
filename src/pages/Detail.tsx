import { Card, Spin } from 'antd';
import { useParams, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { Endpoint } from '../constants/endpoints';
import useFetch from '../hooks/useFetch';
import HeaderMainFooter from '../templates/HeaderMainFooter';

function Detail() {
    let { id, type } = useParams();
    const { error, data } = useFetch<IDocumentDetailResult>(`${Endpoint.Detail}?id_documento=${id}&tipo_documento=${type}`);

    const getComplaint = () => data?.document.segmentos?.find(item => item.tipo_postagem === "complaint");
    const getNotComplaint = () => data?.document.segmentos?.filter(item => item.tipo_postagem !== "complaint");

    if (!data) {
        return <HeaderMainFooter>
            <div className="w-full h-[80vh] flex items-center justify-center">
                <Spin size='large' />
            </div>
        </HeaderMainFooter>
    }

    return (<HeaderMainFooter >
        <div className="w-full max-w-4xl mx-auto">
            <p className='m-0 text-gray-600'>
                {`
                    ${data.document.nome_completo_empresa} - 
                    ${data.document.data} - 
                    ${data.document.cidade}/${data.document.estado} - 
                    ${data.document.resolvido ? "Resolvido" : "Não resolvido"}
                `}
            </p>
            <h2 className='text-2xl'>{data.document.titulo}</h2>

            <Card title={data.document.tipo_problema}>
                <p className="whitespace-pre-line">{getComplaint()?.conteudo}</p>
            </Card>

            {data.document.segmentos ?
                <><Card className='my-4' title={<><Icon name='clock-line' /> Histórico do caso</>}>
                    {getNotComplaint()?.map(item => <>
                        <h3>{item.tipo_interacao == "ANSWER" ? "Resposta da empresa" : "Réplica do Consumidor"}</h3>
                        <p className="whitespace-pre-line">{item.conteudo}</p>
                        <hr className="my-6" />
                    </>)}
                </Card>
                </>
                : null}

        </div>
    </HeaderMainFooter >);
}

export default Detail;
