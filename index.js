document.getElementById("teams_button").onclick = function(e){
    swal({
        title: 'TeamMembers',
        html:
        `
        <table id="popup_table">
            <tbody>
                <tr>
                    <td>&nbsp;<strong>Name</strong></td>
                    <td><strong>Roll num</strong></td>
                </tr>
                <tr>
                    <td>Pratyush Ku. Patnaik</td>
                    <td>20051610</td>
                </tr>
                <tr>
                    <td>Vasu Dutt</td>
                    <td>20051608</td>
                </tr>
                <tr>
                    <td>Suvangi Paul</td>
                    <td>20051298</td>
                </tr>
                <tr>
                    <td>Ronit Kamilla</td>
                    <td>20051606</td>
                </tr>
            </tbody>
        </table>`
      })
}