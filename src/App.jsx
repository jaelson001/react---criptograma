import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
//import wallpaper from './assets/wall.jpeg'
import './App.css'
import Letra from "./Components/Letra"

function App() {
  const [indiceAtual, setIndiceAtual] = useState(0)
  const [deslocamento, setDeslocamento] = useState(0)
  const [valido, setValido] = useState(0)
  const [frases, setFrases] = useState([
    "mais vale um passaro na mao do que dois voando",
    "a vinganca e um prato que se come frio",
    "o povo nao deve temer seu governo, o governo deve temer seu povo", 
    "ser ou nao ser? eis a questao"
  ])
  
  useEffect(() =>{
    let aux = (Math.floor(Math.random()*100)%26)+1;
    setDeslocamento(aux)
    aux = (Math.floor(Math.random()*10)%frases.length);
    setIndiceAtual(aux)
  }, [])

  const cripto = function(c){
      c = c.toUpperCase();
      var limite = 90 - deslocamento;
      var ascii;
      if(c != ' ' && c != '.' && c != ',' && c != '?'){
          var charAtual = c.charCodeAt(0);
          if(charAtual > limite){
              ascii =  (c.charCodeAt(0) + deslocamento) - 26;
          }else{
              ascii = c.charCodeAt(0) + deslocamento;
          }
          c = String.fromCharCode(ascii);
      }
      return c; 
  }

  const checar = (atual) => {
    let invalid = 0
    setTimeout(() => {
      document.querySelectorAll(`input[type="text"]`).forEach((item) => {
        invalid += item.getAttribute('isvalid') == "false" ? 1 : 0;
      })
      if(invalid == 0){
        setValido(1);
      }
    }, 1000)
  }

  const gerarTexto = ()=>{
    let palavra = frases[indiceAtual];
    palavra = palavra.split('');
    return palavra.map((palavraAtual) => {
      let p = palavraAtual.split("");
      return p.map((palavraQuebrada, key) => {
        let letra = palavraQuebrada.toUpperCase();
        let cifrado = cripto(letra);
        letra = (letra == ' ' || letra == '.' || letra == ',' || letra == '?') ? "*" : letra;
        return (
          <Letra chave={cifrado} letra={letra} key={key} checar={checar} />
        );
      })
    })
  }

  const restart = () =>{
    window.location.reload()
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Criptograma</h1>
      </div>
      <div className="caixa">
        {gerarTexto()}
        {
          valido == 1 ? 
          <div className="frase">
            "{frases[indiceAtual]}"
            <button onClick={() => restart()}>Recomeçar</button>
          </div> : 
          ""
        }
      </div>
    </>
  )
}

export default App