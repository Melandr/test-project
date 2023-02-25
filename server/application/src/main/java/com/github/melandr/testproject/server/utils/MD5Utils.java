package com.github.melandr.testproject.server.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.xml.bind.DatatypeConverter;

public class MD5Utils {

	private MD5Utils() {
	}

	public static String calcMd5hash(byte[] input) throws NoSuchAlgorithmException {
		MessageDigest md = MessageDigest.getInstance("MD5");
		md.update(input);
		byte[] digest = md.digest();
		return DatatypeConverter.printHexBinary(digest).toUpperCase();
	}
}
