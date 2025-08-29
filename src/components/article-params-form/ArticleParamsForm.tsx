import clsx from 'clsx';

import { FormEvent, useEffect, useRef, useState } from 'react';

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
import { useCloseOnOutsideClickOrEsc } from 'components/article-params-form/hooks/useCloseOnOutsideClickOrEsc';

type ArticleParamsFormProps = {
	resetHandler: () => void;
	applyHandler: (state: ArticleStateType) => void;
	articleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	resetHandler,
	applyHandler,
	articleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerElementRef = useRef<HTMLDivElement>(null);
	const [formParams, setFormParams] = useState<ArticleStateType>(articleState);

	useEffect(() => {
		setFormParams(articleState);
	}, [articleState]);

	useCloseOnOutsideClickOrEsc({
		isOpen,
		rootRef: containerElementRef,
		onChange: setIsOpen,
	});

	const toggleForm = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	const onSubmitClick = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		applyHandler(formParams);
	};

	const formParamChanged = (
		key: keyof typeof formParams,
		value: OptionType
	) => {
		setFormParams((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				ref={containerElementRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={onSubmitClick}
					onReset={resetHandler}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formParams.fontFamilyOption}
						onChange={(option) => formParamChanged('fontFamilyOption', option)}
					/>
					<RadioGroup
						name='fontSizeOption'
						options={fontSizeOptions}
						selected={formParams.fontSizeOption}
						title='Размер шрифта'
						onChange={(option) => formParamChanged('fontSizeOption', option)}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formParams.fontColor}
						onChange={(option) => formParamChanged('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formParams.backgroundColor}
						onChange={(option) => formParamChanged('backgroundColor', option)}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formParams.contentWidth}
						onChange={(option) => formParamChanged('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
