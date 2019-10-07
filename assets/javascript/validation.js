function checkForm()
{
  document.getElementById('show_errors').style.display = 'none';
  document.getElementById('list_errors').innerHTML = "";
  var hash = document.getElementById('image_hash').value;
  var url = document.getElementById('url').value;

  errors = [];

  if(!hash)
  {
    errors.push("Campo imagem encriptada é inválido");
  }

  if(!url)
  {
    errors.push("URL do produto é inválida.");
  }

  if(url)
  {
    if(url != "https://www.arezzo.com.br/sapatos/scarpins/scarpin-nobuck-salto-fino-amber-yellow/p/1068800090048U")
    {
      errors.push("A URL informada não é válida do produto para gerar a imagem.");
    }
  }

  if(errors.length > 0)
  {
    document.getElementById('show_errors').style.display = 'block';
    errors.forEach(print_error);
    return false;
  }
}

function print_error(value)
{
  document.getElementById('list_errors').innerHTML += "<li>"+value+"</li>";
}