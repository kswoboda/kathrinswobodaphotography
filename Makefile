build:
	rm main.*
	cd ksphoto; ng build --prod
	rm -rf ksphoto/dist/assets
	mv ksphoto/dist/* .
