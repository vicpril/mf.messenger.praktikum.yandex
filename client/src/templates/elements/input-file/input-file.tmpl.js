export default `
    <div 
    <v-if="id">
        id="{{id}}"
    </v-if> 
    class="input_file">
        <div class="form-group">
            <input type="file" name="{{name}}" id="{{id}}-file" class="input-file" onchange="{{onchange}}">
            <label for="{{id}}-file" class="input">
                <i class="icon fa fa-upload"></i>&nbsp;
                <span class="filename">Upload file</span>
            </label>
        </div>
    </div>
`;