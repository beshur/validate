### Validate_ini()
Just call validate_ini() when window is ready. It is safe to recall it when new fields are added.

```
$(function() {
	validate_ini();
})
```

### Code structure
The form should look like:

```
<div class="form_wrap">
	<form>
		<ul class="fields">
			<li>
				<label>Label</label>
				<div class="i">
					<input type="text" data-validate="email" />
				</div>
			</li>
		</ul>
	</form>
</div>
```

### Demo
http://jsfiddle.net/beshur/D8tWs/

In this case the scripts will work out of box, though you may need to change the 'addError' and 'removeError' functions to match your taste.
