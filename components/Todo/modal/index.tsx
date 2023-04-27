import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

export const TodoModal = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    //localStorage에서 불러오기
    const tempTodo = localStorage.getItem('todos');
    //prev로 이전 상태 메모
    setTodos(prev => prev.concat(tempTodo ? JSON.parse(tempTodo) : []));
  }, []);

  useEffect(() => {
    //localStorage에 저장하기
    //불러올 때 코드와 겹치면 안됨
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const onKeyEnterModal = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (text !== '') {
        //console.log(text);
        setTodos([...todos, text]);
        setText('');
      }
    }
  };

  return (
    <ModalContainer>
      <p>할 일 목록 {
        todos.length > 0 ? todos.length : ''
      }</p>
      <div style={{
        height: '80%',
        overflowY: 'scroll',
      }}>
        {todos.map((todo, index) => (
          <Todos key={index}>
            <p>{todo}</p>
            <div onClick={() => {
              //제거
              setTodos(todos.filter((_, i) => i !== index));
            }}>x</div>
          </Todos>
        ))}
      </div>

      <div className='input-container'>
        <a
          onClick={() => {
            if (text !== '') {
              console.log(text);
              setText('');
              setTodos([...todos, text]);

              alert('추가되었습니다.');
            }
          }}
        >+</a>
        <input type="text" placeholder="할 일을 입력하세요"
          value={text} 
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyEnterModal}
        />
      </div>
    </ModalContainer>
  );
};

const ModalContainer = styled.div({
  width: '460px',
  height: '350px',

  borderRadius: '20px',
  boxSizing: 'border-box',

  padding: '20px',

  color: 'black',

  backgroundColor: 'white',

  position: 'absolute',

  bottom: 35,
  right: 125,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '&>p': {
    width: '100%',
    height: '10px',
  },

  '&>div': {
    width: '100%',
    height: '30px',

    position: 'relative',

    '&>a': {
      width: '20px',
      height: '20px',

      borderRadius: '50%',
      backgroundColor: '#05c3a7',

      position: 'absolute',
      left: 10,
      top: 8,

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      color: 'white',
      fontWeight: 'bolder',
    },

    '& input': {
      width: '90%',
      height: '100%',

      border: '2px solid #05c3a7',
      borderRadius: '20px',

      paddingLeft: '40px',

      color: 'gray',

      '&:focus': {
        outline: 'none',
      },
    },


  },

  animation: 'modalOpen 0.1s ease-in-out',
  '@keyframes modalOpen': {
    '0%': {
      width: '0px',
      height: '0px',
    },
    '100%': {
      width: '460px',
      height: '350px',
    },
  },
});


const Todos = styled.div({
  width: '100%',
  height: '35px',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  margin: '5px 0',
  padding: '0 20px',

  boxSizing: 'border-box',

  fontWeight: 'bolder',

  '&:hover': {
    opacity: 0.8,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

});