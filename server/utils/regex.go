package utils

import "regexp"

var numberOnlyRegex = regexp.MustCompile(`\D`)

func GetNumberOnly(value string) string {
	return numberOnlyRegex.ReplaceAllString(value, "")
}
