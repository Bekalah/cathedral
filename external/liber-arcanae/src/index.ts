// Minimal Liber Arcanae surface for web app build
export type MajorArcana = {
	number: number
	name: string
	element: string
}

const MAJOR_ARCANA_NAMES = [
	'The Fool','The Magician','The High Priestess','The Empress','The Emperor','The Hierophant','The Lovers','The Chariot','Strength','The Hermit','Wheel of Fortune','Justice','The Hanged Man','Death','Temperance','The Devil','The Tower','The Star','The Moon','The Sun','Judgement','The World'
]

export function getCardName(num: number): string {
	return MAJOR_ARCANA_NAMES[num] ?? `Arcana-${num}`
}

export function getCard(num: number): MajorArcana {
	return {
		number: num,
		name: getCardName(num),
		element: ['Fire','Water','Air','Earth','Aether'][num % 5],
	}
}

export const MAJOR_ARCANA: MajorArcana[] = Array.from({ length: 22 }, (_, i) => getCard(i))

