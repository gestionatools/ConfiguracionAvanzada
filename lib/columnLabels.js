export const COLUMN_LABELS = {
  ID:                      'ID',
  referencia_catastral:    'Referencia Catastral',
  municipio:               'Municipio',
  clase_suelo:             'Clase de Suelo',
  categoria_suelo:         'Categoría de Suelo',
  ambito_planeamiento:     'Ámbito de Planeamiento',
  ambito_codigo:           'Código de Ámbito',
  unidad_ejecucion:        'Unidad de Ejecución',
  zonificacion:            'Zonificación',
  subzonificacion:         'Subzonificación',
  ordenanza:               'Ordenanza',
  instrumento_planeamiento:'Instrumento de Planeamiento',
  edificabilidad_m2m2:     'Edificabilidad (m²/m²)',
  ocupacion_maxima_pct:    'Ocupación Máxima (%)',
  altura_max_plantas:      'Altura Máxima (plantas)',
  superficie_parcela_m2:   'Superficie de Parcela (m²)',
  licencia_urbanistica:    'Licencia Urbanística',
  longitud:                'Longitud',
  latitud:                 'Latitud',
  doc_url:                 'Documento',
  titular_NIF:             'NIF del Titular',
  construccion_fecha:      'Fecha de Construcción',
}

export const FIELD_GROUPS = [
  {
    label: 'Identificación',
    color: 'nucleo',
    fields: ['referencia_catastral', 'titular_NIF'],
  },
  {
    label: 'Localización',
    color: 'teal',
    fields: ['municipio', 'latitud', 'longitud'],
  },
  {
    label: 'Clasificación del Suelo',
    color: 'amber',
    fields: ['clase_suelo', 'categoria_suelo', 'zonificacion', 'subzonificacion'],
  },
  {
    label: 'Planeamiento',
    color: 'violet',
    fields: ['instrumento_planeamiento', 'ambito_planeamiento', 'ambito_codigo', 'unidad_ejecucion', 'ordenanza'],
  },
  {
    label: 'Parámetros Edificatorios',
    color: 'rose',
    fields: ['edificabilidad_m2m2', 'ocupacion_maxima_pct', 'altura_max_plantas', 'superficie_parcela_m2'],
  },
  {
    label: 'Gestión y Documentación',
    color: 'slate',
    fields: ['licencia_urbanistica', 'construccion_fecha', 'doc_url'],
  },
]
