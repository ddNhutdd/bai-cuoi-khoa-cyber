import React from 'react'
import css from './star.module.scss'
import { StarFillIcon, StarEmptyIcon } from '../../../assets/icons/icons.ts'
type StarProps = {
    selected: boolean
    onSelect: () => void
}
export const Star: React.FC<StarProps> = ({ selected, onSelect }) => (
    <div className={css['star']}>
        <span onClick={onSelect}>{selected ? <StarFillIcon /> : <StarEmptyIcon />} </span>
    </div>
)
