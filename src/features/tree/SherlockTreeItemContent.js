import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
import { useTreeItem } from '@material-ui/lab/TreeItem'
import React from 'react'

import { useTreeItemStyles } from "./treeItem.css"

function computeLabelIcon(LabelIcon, classes) {
    if (LabelIcon === ArrowRight) {
        return <Typography className={classes.outPredicateIcon}>
            →
        </Typography>
    } else if (LabelIcon === ArrowLeft) {
        return <Typography className={classes.inPredicateIcon}>
            ←
        </Typography>
    }
    return <LabelIcon color="inherit" className={classes.labelIcon} />
}

export default React.forwardRef((props, ref) => {
    const {
        classes,
        className,
        labelText,
        labelIcon: LabelIcon,
        labelInfo,
        color,
        bgColor,
        nodeId,
        icon: iconProp,
        expansionIcon,
        displayIcon,
        ...other
    } = props;
    const {
        disabled,
        expanded,
        selected,
        focused,
        handleExpansion,
        handleSelection,
        preventSelection,
    } = useTreeItem(nodeId)

    const icon = iconProp || expansionIcon || displayIcon

    const handleMouseDown = (event) => {
        preventSelection(event);
    };

    const handleExpansionClick = (event) => {
        handleExpansion(event);
    };

    const handleSelectionClick = (event) => {
        handleSelection(event);
    };

    return (
        <div
            // label={
            //     <div className={classes.labelRoot}>
            //         {computeLabelIcon(LabelIcon, classes)}
            //         <Typography variant="body2" className={classes.labelText}>
            //             {labelText}
            //         </Typography>
            //         <Typography variant="caption" color="inherit" className={classes.labelInfo}>
            //             {labelInfo}
            //         </Typography>
            //     </div>
            // }
            // // style={{
            // //     '--tree-view-color': color,
            // //     '--tree-view-bg-color': bgColor,
            // // }}
            // classes={{
            //     root: classes.root,
            //     content: classes.content,
            //     expanded: classes.expanded,
            //     selected: classes.selected,
            //     group: classes.group,
            //     label: classes.label,
            // }}
            // // {...other}
            className={clsx(className, classes.root, {
                [classes.expanded]: expanded,
                [classes.selected]: selected,
                [classes.focused]: focused,
                [classes.disabled]: disabled,
            })}
            onMouseDown={handleMouseDown}
            ref={ref}
        >
            <div
                className={classes.iconContainer}
                onClick={handleExpansionClick}>
                {icon}
            </div>
            <div
                className={classes.label}
                component="div"
                onClick={handleSelectionClick}>
                {computeLabelIcon(LabelIcon, classes)}
                <Typography className={classes.labelText} component="span" variant="body2" >
                    {labelText}
                </Typography>
                <Typography className={classes.labelInfo} color="inherit" component="span" variant="caption">
                    {labelInfo}
                </Typography>
            </div>
        </div>
    )
})