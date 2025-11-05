
import React from 'react'
interface Props extends React.InputHTMLAttributes<HTMLInputElement> { label: string }
const FormField: React.FC<Props> = ({ label, ...rest }) => (
  <div className="grid" style={{ gap: '.3rem' }}>
    <label className="label">{label}</label>
    <input className="input" {...rest} />
  </div>
)
export default FormField
