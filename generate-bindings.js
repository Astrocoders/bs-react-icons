const fs = require('fs');
const os = require('os');

const iconSets = {
  Fa: require('react-icons/fa'),
  Io: require('react-icons/io'),
  Md: require('react-icons/md'),
  Ti: require('react-icons/ti'),
  Go: require('react-icons/go'),
  Fi: require('react-icons/fi')
};

const generateContents = () =>
  Object.entries(iconSets)
    .map(([iconSet, icons]) =>
      Object.keys(icons)
        .map(
          icon =>
            `module ${icon} = {
  [@bs.module "react-icons/${iconSet.toLowerCase()}"]
  [@react.component] external make : (~className: string=?, ~color: string=?, ~size: string=?, style: ReactDOMRe.Style.t=?) => React.element = "${icon}";
};`
        ).
        join(`${os.EOL}${os.EOL}`)
    ).
    join(`${os.EOL}${os.EOL}`);

fs.writeFile('./src/ReactIcons.re', `/*
 * This file has been generated
 */

${generateContents()}`, 'utf8', () => {});
