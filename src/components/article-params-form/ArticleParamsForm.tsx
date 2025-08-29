import clsx from 'clsx';

import { useEffect, useRef, useState } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	onReset: () => void;
	onApply: (state: ArticleStateType) => void;
	articleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	onReset,
	onApply,
	articleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [formParams, setFormParams] = useState<ArticleStateType>(articleState);

	useEffect(() => {
		setFormParams(articleState);
	}, [articleState]);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => {},
		onChange: setIsOpen,
	});

	const onArrowButtonClick = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	const onChangeParam = (key: keyof typeof formParams, value: OptionType) => {
		setFormParams((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const onSubmitClick = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formParams);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onArrowButtonClick} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={onSubmitClick}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formParams.fontFamilyOption}
						onChange={(option) => onChangeParam('fontFamilyOption', option)}
					/>
					<RadioGroup
						name='fontSizeOption'
						options={fontSizeOptions}
						selected={formParams.fontSizeOption}
						title='Размер шрифта'
						onChange={(option) => onChangeParam('fontSizeOption', option)}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formParams.fontColor}
						onChange={(option) => onChangeParam('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formParams.backgroundColor}
						onChange={(option) => onChangeParam('backgroundColor', option)}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formParams.contentWidth}
						onChange={(option) => onChangeParam('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
