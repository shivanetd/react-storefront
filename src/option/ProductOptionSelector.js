import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import ProductOption from './ProductOption'

export const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing(0, 0.5, 0.5, 0),
  },
})

const useStyles = makeStyles(styles, { name: 'RSFProductOptionSelector' })

/**
 * A selector for product options rendered as a set of buttons. Buttons can either have
 * text or an image. The text for the selected option can optionally be displayed below
 * the buttons.
 *
 * This component supports AMP.
 */
export default function ProductOptionSelector({
  options,
  name,
  classes,
  optionProps,
  skeleton,
  variant,
  OptionComponent,
}) {
  classes = useStyles({ classes })

  if (skeleton) {
    options = new Array(skeleton).fill(0).map((_item, i) => ({ id: i, text: '' }))
  }

  if (!options) return null

  return (
    <div data-id="ProductOptionSelector" className={classes.root}>
      {options.map((option, i) => {
        return (
          <OptionComponent
            {...optionProps}
            variant={variant || (option.image || option.color ? 'swatch' : 'text')}
            name={name}
            key={option.id}
            className={clsx(classes.button, optionProps.className)}
            index={i}
            imageProps={option.image}
            value={option}
            skeleton={skeleton != null}
          />
        )
      })}
    </div>
  )
}

ProductOptionSelector.propTypes = {
  /**
   * Overridable classes object to allow customization of component
   */
  classes: PropTypes.objectOf(PropTypes.string),

  /**
   * Props for displayed images. See <Image /> component for details
   */
  imageProps: PropTypes.object,

  /**
   * The name of property in amp state to bind to
   */
  name: PropTypes.string,

  /**
   * Props to apply to each `SwatchProductOption` or `TextProductOption` element.
   */
  optionProps: PropTypes.object,

  /**
   * If specified, this number of skeleton buttons will be displayed instead of
   * displaying the actual buttons.
   */
  skeleton: PropTypes.number,

  /**
   * Allows you to override the default component which is used to render a product option.
   */
  OptionComponent: PropTypes.func,
}

ProductOptionSelector.defaultProps = {
  items: [],
  optionProps: {},
  imageProps: {},
  OptionComponent: ProductOption,
}