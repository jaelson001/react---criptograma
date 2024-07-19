import {useState} from 'react'
import "./Letra.css"

const Letra = (props) => {
	const [letra, setLetra] = useState(props.letra)
	const [letraDigitada, setLetraDigitada] = useState("")
	const [valid, setValid] = useState("false")

	const check = function(event){
		let l = event.nativeEvent.data.toUpperCase();
		setLetraDigitada(l)
		let aux = l == props.letra.toUpperCase() ? "true" : "false";
		setValid(aux);
		props.checar(aux, props.chave, l);
		event.target.parentNode.nextSibling.children[0].focus()
	}

	return (
		props.letra != "*" ?
		<div className="letra">
			<input type="text" keyset={props.chave} value={letraDigitada} isvalid={valid} onChange={(e) => {check(e)}} />
			<span>{props.chave}</span>
		</div>
		:
		<div className="letra">
			<input type="hidden" isvalid="true" />
			<span>{props.chave}</span>
		</div>

	);
}
export default Letra;