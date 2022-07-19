import { Modal } from 'antd';
import React from 'react';

type Props = {
    isModalVisible: boolean,
    onClose: () => void
}

function HomeHelp({ isModalVisible, onClose }: Props) {
    return (<>
        <Modal title="Basic Modal" visible={isModalVisible} onCancel={onClose} footer={null} >

            <p><strong>Operadores lógicos:</strong> OU, E (+), E NÃO (-), precedência: abre "(" e fecha parênteses ")"</p>

            <p><strong>Funções:</strong></p>

            <p><strong>Coringa <span className='text-blue-700'>*</span>:</strong> você pode fazer pesquisas usando partes de uma palavra: negativ*, indevid*, incorret*, etc</p>

            <p><strong>Radicais <span className='text-green-700'>√</span>:</strong> expande a busca com palavras derivadas do termo inserido, por exemplo: *negativ* _-ação_, *negativ* _-ado_, *negativ* _-ada_, etc.</p>

            <p><strong>Variações <span className="text-red-700">~</span>:</strong> inclui resultados contendo as palavras que você escreveu e variações na escrita dessas palavras (por exemplo, erros de português e digitação)</p>

            <p><strong>Incluir sinônimos <span className="text-orange-700">≡</span>:</strong> inclui resultados contendo as palavras que são sinônimos ou _semanticamente próximas_ aos termos informados, por exemplo: SERASA = SPC = serviço de proteção ao crédito</p>

            <p>Para ver ou modificar o dicionário de sinônimos <a href="https://www.sinonimos.com.br/">clique aqui</a></p>

            <p><strong>Enegramas <span className="text-pink-700">(A, B)~N</span>:</strong> retorna todos os resultados com as palavras A e B em qualquer ordem e separadas por no máximo N palavras</p>
        </Modal>
    </>);
}

export default HomeHelp;
