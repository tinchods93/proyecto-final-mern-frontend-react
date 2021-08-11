import './MyButton.css';

const MyButton = ({ innerText, onClickF }) => {
  return (
    <div onClick={onClickF} className='MyButton'>
      {innerText}
    </div>
  );
};

export default MyButton;
