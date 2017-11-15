import React from 'react';
import TextField from 'material-ui/TextField';
import $ from 'jquery';
import 'jquery-mask-plugin';


export class InputCPF extends React.Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
      $(`#${this.props.id}`).mask('000.000.000-00', {reverse: true});
  }

  render() {
      let {
          label, 
          id,
      } = this.props;

      return (
        <TextField id={id} floatingLabelText = {label}
                  {...this.props} fullWidth={true}
                  underlineFocusStyle={{borderColor: '#000000'}} 
                  floatingLabelStyle={{color: '#5B5B5B'}}/>
      );
  }
}