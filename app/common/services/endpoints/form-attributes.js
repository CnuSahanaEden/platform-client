module.exports = [
    '$resource',
    'Util',
function(
    $resource,
    Util
) {

    var FormAttributeEndpoint = $resource(Util.apiUrl('/forms/:formId/attributes/:id'), {
        formId: '@formId',
        id: '@id',
        order: 'asc',
        orderby: 'priority'
    }, {
        query: {
            method: 'GET',
            isArray: true,
            transformResponse: function(data /*, header*/) {
                return Util.transformResponse(data).results;
            }
        }
    });

    return FormAttributeEndpoint;
}];
