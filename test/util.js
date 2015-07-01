exports.ensureLabelLinkage = function (component, id) {
  var el = component.getDOMNode();
  var field = el.querySelector('#' + id);
  var label = el.querySelector('label[for="' + id + '"]');

  if (!field)
    throw new Error('no form field found with id ' + id);

  if (['input', 'textarea'].indexOf(field.nodeName.toLowerCase()) == -1)
    throw new Error(field.nodeName.toLowerCase() +
                    '#' + id + ' is not a form field');

  if (!label)
    throw new Error('no label found for id ' + id);

  if (label.textContent.trim() == 0)
    throw new Error('empty label found for id ' + id);
}
