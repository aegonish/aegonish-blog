{{/*
Return chart name.
*/}}
{{- define "backend.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Return full name.
*/}}
{{- define "backend.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else }}
{{- printf "%s-%s" .Release.Name (include "backend.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
