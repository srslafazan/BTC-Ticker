INPUT_ICON="${1}"
SET_NAME="${2}"


cd assets

mkdir ${SET_NAME}.iconset

sips -z 16 16     ${INPUT_ICON} --out ${SET_NAME}.iconset/icon_16x16.png
sips -z 32 32     ${INPUT_ICON} --out ${SET_NAME}.iconset/icon_16x16@2x.png
sips -z 32 32     ${INPUT_ICON} --out ${SET_NAME}.iconset/icon_32x32.png
sips -z 64 64     ${INPUT_ICON} --out ${SET_NAME}.iconset/icon_32x32@2x.png
sips -z 128 128   ${INPUT_ICON} --out ${SET_NAME}.iconset/icon_128x128.png
sips -z 256 256   ${INPUT_ICON} --out ${SET_NAME}.iconset/icon_128x128@2x.png
sips -z 256 256   ${INPUT_ICON} --out ${SET_NAME}.iconset/icon_256x256.png
sips -z 512 512   ${INPUT_ICON} --out ${SET_NAME}.iconset/icon_256x256@2x.png
sips -z 512 512   ${INPUT_ICON} --out ${SET_NAME}.iconset/icon_512x512.png

cp ${INPUT_ICON} ${SET_NAME}.iconset/icon_512x512@2x.png

iconutil -c icns ${SET_NAME}.iconset

rm -R ${SET_NAME}.iconset

cd ../
