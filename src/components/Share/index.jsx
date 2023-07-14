import { useState } from 'react';
import PropTypes from 'prop-types';
import clipBoardCopy from 'clipboard-copy';

import './Share.css';
import shareIcon from '../../images/share.png';
import shareCypressIcon from '../../images/shareIcon.svg';

const oneSecond = 1000;
export default function Share({ id, type, 'data-testid': testid }) {
  const [show, setShow] = useState(false);
  const handleShare = () => {
    setShow(true);
    const correctType = type.includes('s') ? type : `${type}s`;
    clipBoardCopy(`http://localhost:3000/${correctType}/${id}`);
    setTimeout(() => {
      setShow(false);
    }, oneSecond);
  };

  return (
    <div className="share-recipe">
      <div className={ show ? '' : 'invisible' }>Link copied!</div>
      <button
        data-testid={ testid }
        onClick={ handleShare }
        src={ shareCypressIcon }
      >
        <img src={ shareIcon } alt="compartilhar receita" />
      </button>
    </div>
  );
}

Share.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  'data-testid': PropTypes.string.isRequired,
};
