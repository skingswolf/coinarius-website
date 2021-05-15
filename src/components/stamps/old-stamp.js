import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Types} from './stamps-utils';
import {PriorityHome} from './PriorityHome';
import {Performance} from './Performance';
import {Signals} from './Signals';
import {Volume} from './Volume';
import {Insiders} from './Insiders';
import {Valuation} from './Valuation';
import {ImpliedVol} from './ImpliedVol';
import {ShortInterest} from './ShortInterest';
import {CDS} from './CDS';
import {Divergence} from './Divergence';
import {StockHome} from './StockHome';
import {Jobs} from './Jobs';
import {ESG} from './ESG';
import {PressRelease} from './PressRelease';
import {Dividend} from './Dividend';
import {EPSMomentum} from './EPSMomentum';
import {StockEvents} from './StockEvents';
import {WatchlistEvents} from './WatchlistEvents';
import {themeVariables} from '../../styles/variables-resolver';
import themesNames from '../../styles/themesNames';
import Tooltip from '../Tooltip/Tooltip';

const StampComponent = ({stampType, ...rest}) => {
  switch (stampType) {
    case Types.PriorityHome:
      return <PriorityHome {...rest} />;
    case Types.StockHome:
      return <StockHome {...rest} />;
    case Types.Performance:
      return <Performance {...rest} />;
    case Types.Signals:
      return <Signals {...rest} />;
    case Types.Volume:
      return <Volume {...rest} />;
    case Types.Insiders:
      return <Insiders {...rest} />;
    case Types.Valuation:
      return <Valuation {...rest} />;
    case Types.ImpliedVol:
      return <ImpliedVol {...rest} />;
    case Types.ShortInterest:
      return <ShortInterest {...rest} />;
    case Types.CDS:
      return <CDS {...rest} />;
    case Types.Divergence:
      return <Divergence {...rest} />;
    case Types.Jobs:
      return <Jobs {...rest} />;
    case Types.ESG:
      return <ESG {...rest} />;
    case Types.PressRelease:
      return <PressRelease {...rest} />;
    case Types.EPSMomentum:
      return <EPSMomentum {...rest} />;
    case Types.Dividend:
      return <Dividend {...rest} />;
    case Types.StockEvents:
      return <StockEvents {...rest} />;
    case Types.WatchlistEvents:
      return <WatchlistEvents {...rest} />;
    default:
      return 'Stamp unavailable';
  }
};

export const resolveColour = colour => {
  const value = colour?.toLowerCase();
  if (value === 'red' || value === 'green') {
    return value;
  }

  return null;
};

export const esgGradeColorMatcher = (grade, themeName = themesNames.dark) => {
  const styles = themeVariables[themeName];

  switch (true) {
    case /A/.test(grade):
    case /B/.test(grade):
      return styles.esgGradeAB;
    case /C/.test(grade):
      return styles.esgGradeC;
    case /D/.test(grade):
    case /E/.test(grade):
    case /F/.test(grade):
      return styles.esgGradeDEF;
    default:
      return null;
  }
};

/**
 * @visibleName Stamp-Factory
 */
export const Stamp = ({stampType, ...rest}) => {
  const {significantColour, borderColour, tooltip, onMouseEnter, onMouseLeave} = rest;
  const colourSignificant = resolveColour(significantColour);
  const colourBorder = resolveColour(borderColour);
  const flagging = colourSignificant || colourBorder;
  // The stamp will either have no colour, red or green based on the flagging values
  // It will also either have background or border colour depending on the flagging of borderColour or
  // significantColour. If both or significantColour is flagging then it will add backgorund colour if
  // only borderColour is flagging then it will add border colour
  const flaggingClassNames = classnames(
    'stamp',
    {[`border-colour-${colourBorder}`]: colourBorder && !colourSignificant},
    {[`stamp-flagging-${flagging}`]: flagging}
  );
  // The stamp will flag based on borderColour or significantColour
  // borderColour will add 2px solid red or green colour based on the direction of the flag
  // significantColour will hgihlight the header red or green colour based on the direction of the flag
  const bodyClassNames = classnames('body', {'has-border-colour': colourBorder}, {'has-significant-colour': colourSignificant});
  const props = {bodyClassNames, ...rest};

  const handleMouseEnter = useCallback(() => {
    onMouseEnter && onMouseEnter();
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    onMouseLeave && onMouseLeave();
  }, [onMouseLeave]);

  return (
    // onShow={() => !!tooltip} for not showing empty tooltips
    <Tooltip
      className="stamp-tooltip"
      allowHTML={true}
      content={<div dangerouslySetInnerHTML={{__html: tooltip}} />}
      placement="right-start"
      onShow={() => !!tooltip}
      offset={[0, 16]}
    >
      <div
        role="stamp"
        className={flaggingClassNames}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-testid={`stamp-${stampType}`}
      >
        <StampComponent stampType={stampType} {...props} />
      </div>
    </Tooltip>
  );
};
Stamp.propTypes = {
  stampType: PropTypes.string.isRequired
};

export default Stamp;